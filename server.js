const express = require('express');
const path = require('path');
const https = require('https');
const fs = require('fs');
const multer = require('multer');
const app = express();

// Middleware
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(express.static(__dirname));

// Ensure uploads directory exists
const UPLOADS_DIR = path.join(__dirname, 'uploads');
if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true });
}
app.use('/uploads', express.static(UPLOADS_DIR));

// File Paths
const ORDERS_FILE = path.join(__dirname, 'orders.json');
const PRODUCTS_FILE = path.join(__dirname, 'products.json');
const SLIDER_FILE = path.join(__dirname, 'slider.json');

// Initialize JSON files if they don't exist
if (!fs.existsSync(ORDERS_FILE)) {
    fs.writeFileSync(ORDERS_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(PRODUCTS_FILE)) {
    fs.writeFileSync(PRODUCTS_FILE, JSON.stringify([], null, 2));
}
if (!fs.existsSync(SLIDER_FILE)) {
    fs.writeFileSync(SLIDER_FILE, JSON.stringify([], null, 2));
}

// Multer Configuration
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, UPLOADS_DIR);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 50 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const allowedTypes = /jpeg|jpg|png|gif|webp/;
        const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = allowedTypes.test(file.mimetype);
        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb(new Error('Only image files are allowed'));
        }
    }
});

// Configuration
const BOT_TOKEN = process.env.BOT_TOKEN || '8291119939:AAHodtowSjgnCcTN256ZIVCZUKMNuesxovQ';
const CHAT_ID = process.env.CHAT_ID || '7372428049';

// ============ PUBLIC APIs ============

app.get('/api/products', (req, res) => {
    try {
        const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
        res.json(products);
    } catch (err) {
        res.json([]);
    }
});

app.get('/api/slider', (req, res) => {
    try {
        const slider = JSON.parse(fs.readFileSync(SLIDER_FILE, 'utf8'));
        res.json(slider);
    } catch (err) {
        res.json([]);
    }
});

app.post('/api/order', (req, res) => {
    try {
        const { customerName, phone, gov, area, items, total, productIds } = req.body;
        const orderTime = new Date().toLocaleString('en-US', { timeZone: 'Asia/Baghdad' });

        // Update Stock
        const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
        productIds.forEach(id => {
            const p = products.find(x => x.id == id);
            if (p && p.stock > 0) p.stock -= 1;
        });
        fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));

        // Save Order
        const orders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
        const newOrder = { id: Date.now(), customerName, phone, gov, area, items, total, time: orderTime };
        orders.push(newOrder);
        fs.writeFileSync(ORDERS_FILE, JSON.stringify(orders, null, 2));

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
            res.status(response.statusCode === 200 ? 200 : 500).json({ success: response.statusCode === 200 });
        });

        request.on('error', (err) => {
            console.error('Telegram error:', err);
            res.status(200).json({ success: true });
        });

        request.write(data);
        request.end();
    } catch (err) {
        console.error('Order error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

// ============ ADMIN APIs ============

app.get('/api/admin/orders', (req, res) => {
    try {
        const orders = JSON.parse(fs.readFileSync(ORDERS_FILE, 'utf8'));
        res.json(orders.reverse());
    } catch (err) {
        res.json([]);
    }
});

app.post('/api/admin/products', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'No file uploaded' });
        }

        const products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
        const newP = {
            id: Date.now(),
            name: req.body.name,
            price: parseInt(req.body.price) || 0,
            discount: parseInt(req.body.discount) || 0,
            stock: parseInt(req.body.stock) || 0,
            img: `/uploads/${req.file.filename}`
        };
        products.push(newP);
        fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
        res.json({ success: true });
    } catch (err) {
        console.error('Product upload error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.delete('/api/admin/products/:id', (req, res) => {
    try {
        let products = JSON.parse(fs.readFileSync(PRODUCTS_FILE, 'utf8'));
        products = products.filter(p => p.id != req.params.id);
        fs.writeFileSync(PRODUCTS_FILE, JSON.stringify(products, null, 2));
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

app.post('/api/admin/slider', upload.single('image'), (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, error: 'No file uploaded' });
        }

        const slider = JSON.parse(fs.readFileSync(SLIDER_FILE, 'utf8'));
        slider.push(`/uploads/${req.file.filename}`);
        fs.writeFileSync(SLIDER_FILE, JSON.stringify(slider, null, 2));
        res.json({ success: true });
    } catch (err) {
        console.error('Slider upload error:', err);
        res.status(500).json({ success: false, error: err.message });
    }
});

app.delete('/api/admin/slider/:index', (req, res) => {
    try {
        const slider = JSON.parse(fs.readFileSync(SLIDER_FILE, 'utf8'));
        slider.splice(req.params.index, 1);
        fs.writeFileSync(SLIDER_FILE, JSON.stringify(slider, null, 2));
        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ success: false, error: err.message });
    }
});

// ============ STATIC FILES ============

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// ============ ERROR HANDLING ============

app.use((err, req, res, next) => {
    console.error('Error:', err);
    res.status(500).json({ success: false, error: err.message });
});

// ============ START SERVER ============

const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Sky Store is running on port ${PORT}`);
    console.log(`📁 Uploads directory: ${UPLOADS_DIR}`);
});
