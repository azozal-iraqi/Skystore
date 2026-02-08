const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const multer = require('multer');

const app = express();

// ============ MIDDLEWARE ============
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(__dirname));

// ============ DIRECTORIES ============
const UPLOADS_DIR = path.join(__dirname, 'uploads');
const DATA_DIR = __dirname;

// Create uploads directory
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}

app.use('/uploads', express.static(UPLOADS_DIR));

// ============ FILE PATHS ============
const ORDERS_FILE = path.join(DATA_DIR, 'orders.json');
const PRODUCTS_FILE = path.join(DATA_DIR, 'products.json');
const SLIDER_FILE = path.join(DATA_DIR, 'slider.json');

// ============ INITIALIZE FILES ============
function ensureFile(filePath, defaultData = []) {
    try {
        if (!fs.existsSync(filePath)) {
            fs.writeFileSync(filePath, JSON.stringify(defaultData, null, 2), 'utf8');
        }
    } catch (err) {
        console.error(`Error creating file ${filePath}:`, err);
    }
}

ensureFile(ORDERS_FILE, []);
ensureFile(PRODUCTS_FILE, []);
ensureFile(SLIDER_FILE, []);

// ============ MULTER CONFIG ============
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        cb(null, 'img-' + uniqueSuffix + ext);
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const ext = path.extname(file.originalname).toLowerCase();
        const mime = file.mimetype;
        
        if (allowedTypes.test(ext) && allowedTypes.test(mime)) {
            cb(null, true);
        } else {
            cb(new Error('Only image files allowed'));
        }
    }
});

// ============ CONFIG ============
const BOT_TOKEN = process.env.BOT_TOKEN || '8291119939:AAHodtowSjgnCcTN256ZIVCZUKMNuesxovQ';
const CHAT_ID = process.env.CHAT_ID || '7372428049';

// ============ HELPER FUNCTIONS ============
function readFile(filePath) {
    try {
        return JSON.parse(fs.readFileSync(filePath, 'utf8'));
    } catch (err) {
        console.error(`Error reading ${filePath}:`, err);
        return [];
    }
}

function writeFile(filePath, data) {
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2), 'utf8');
    } catch (err) {
        console.error(`Error writing ${filePath}:`, err);
    }
}

// ============ PUBLIC ROUTES ============

app.get('/api/products', (req, res) => {
    const products = readFile(PRODUCTS_FILE);
    res.json(products);
});

app.get('/api/slider', (req, res) => {
    const slider = readFile(SLIDER_FILE);
    res.json(slider);
});

app.post('/api/order', (req, res) => {
    try {
        const { customerName, phone, gov, area, items, total, productIds } = req.body;
        
        if (!customerName || !phone || !gov || !area || !items || !total) {
            return res.status(400).json({ success: false, error: 'Missing required fields' });
        }

        const orderTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Baghdad' });

        // Update stock
        let products = readFile(PRODUCTS_FILE);
        if (productIds && Array.isArray(productIds)) {
            productIds.forEach(id => {
                const p = products.find(x => x.id == id);
                if (p && p.stock > 0) p.stock -= 1;
            });
            writeFile(PRODUCTS_FILE, products);
        }

        // Save order
        const orders = readFile(ORDERS_FILE);
        const newOrder = {
            id: Date.now(),
            customerName,
            phone,
            gov,
            area,
            items,
            total,
            time: orderTime
        };
        orders.push(newOrder);
        writeFile(ORDERS_FILE, orders);

        // Send to Telegram
        const waMessage = `السلام عليكم\nفريق Sky Store لتأكيد الطلبات 🤍\n🧾 تفاصيل الطلب:\n📍 المحافظة: ${gov}\n📍 المنطقة: ${area}\n📞 رقم الهاتف: ${phone}\n📦 المنتجات: ${items}\n💰 السعر النهائي: ${total}\n⏰ Order Time: ${orderTime}\n✅ تم تأكيد الطلب\nسيتم تجهيز الطلب وشحنه إلى عنوانكم في أقرب وقت ممكن 🚚\nشكرًا لاختياركم Sky Store 🤍`;
        const encodedWaMessage = encodeURIComponent(waMessage);
        let cleanPhone = phone.startsWith('0') ? '964' + phone.substring(1) : (phone.startsWith('964') ? phone : '964' + phone);
        const waLink = `https://wa.me/${cleanPhone}?text=${encodedWaMessage}`;

        const telegramMessage = `🌟 *طلب جديد من Sky Store* 🌟\n\n👤 *الزبون:* ${customerName}\n📦 *المنتجات:* ${items}\n💰 *الإجمالي:* ${total}\n\n📍 *الموقع:* ${gov} - ${area}\n📞 *الهاتف:* \`${phone}\`\n\n⏰ *Order Time:* ${orderTime}\n\n✅ [تأكيد عبر واتساب](${waLink})`;

        const data = JSON.stringify({
            chat_id: CHAT_ID,
            text: telegramMessage,
            parse_mode: 'Markdown',
            disable_web_page_preview: true
        });

        const request = https.request(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(data)
            }
        }, (response) => {
            if (response.statusCode === 200) {
                res.json({ success: true });
            } else {
                res.json({ success: true }); // Still return success even if Telegram fails
            }
        });

        request.on('error', (err) => {
            console.error('Telegram error:', err);
            res.json({ success: true }); // Return success anyway
        });

        request.write(data);
        request.end();
    } catch (err) {
        console.error('Order error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ============ ADMIN ROUTES ============

app.get('/api/admin/orders', (req, res) => {
    const orders = readFile(ORDERS_FILE);
    res.json(orders.reverse());
});

app.post('/api/admin/products', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'No image uploaded' });
        }

        const { name, price, discount, stock } = req.body;
        if (!name || !price) {
            return res.status(400).json({ success: false, error: 'Missing name or price' });
        }

        const products = readFile(PRODUCTS_FILE);
        const newProduct = {
            id: Date.now(),
            name: name.trim(),
            price: parseInt(price) || 0,
            discount: parseInt(discount) || 0,
            stock: parseInt(stock) || 0,
            img: `/uploads/${req.file.filename}`
        };

        products.push(newProduct);
        writeFile(PRODUCTS_FILE, products);
        res.json({ success: true, product: newProduct });
    } catch (err) {
        console.error('Product upload error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.delete('/api/admin/products/:id', (req, res) => {
    try {
        let products = readFile(PRODUCTS_FILE);
        products = products.filter(p => p.id != req.params.id);
        writeFile(PRODUCTS_FILE, products);
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/admin/slider', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'No image uploaded' });
        }

        const slider = readFile(SLIDER_FILE);
        slider.push(`/uploads/${req.file.filename}`);
        writeFile(SLIDER_FILE, slider);
        res.json({ success: true });
    } catch (err) {
        console.error('Slider upload error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.delete('/api/admin/slider/:index', (req, res) => {
    try {
        const slider = readFile(SLIDER_FILE);
        const index = parseInt(req.params.index);
        if (index >= 0 && index < slider.length) {
            slider.splice(index, 1);
            writeFile(SLIDER_FILE, slider);
        }
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ============ STATIC FILES ============

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ============ 404 HANDLER ============

app.use((req, res) => {
    res.status(404).json({ error: 'Not found' });
});

// ============ ERROR HANDLER ============

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ success: false, error: err.message });
});

// ============ START SERVER ============

const PORT = process.env.PORT || 3000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`✅ Sky Store is running on port ${PORT}`);
    console.log(`📁 Uploads directory: ${UPLOADS_DIR}`);
    console.log(`📊 Data directory: ${DATA_DIR}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    process.exit(0);
});
