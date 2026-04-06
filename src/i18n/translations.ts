export type Lang = "ar" | "en";

export const translations = {
  ar: {
    // Nav
    appName: "Sky Face",
    home: "الرئيسية",
    exercises: "التمارين",
    subscription: "الاشتراك",
    
    // Hero
    heroTitle: "Sky Face",
    heroSubtitle: "10 دقائق لفك حاد وملامح بارزة",
    heroDescription: "برنامج تمارين الوجه الأكثر تطوراً لنحت ملامحك وإبراز جمالك الطبيعي",
    getStarted: "ابدأ الآن",
    
    // Exercises
    exercisesTitle: "تمارين الوجه",
    exercisesSubtitle: "تمارين يومية مصممة بعناية لتحسين ملامح وجهك",
    duration: "المدة",
    minutes: "دقائق",
    reps: "التكرار",
    times: "مرات",
    steps: "الخطوات",

    // Exercise items
    jawlineTitle: "تمرين خط الفك",
    jawlineDesc: "تمرين مكثف لنحت وتحديد خط الفك بشكل واضح",
    jawlineSteps: [
      "اجلس بوضعية مستقيمة وارفع ذقنك للأعلى",
      "ادفع فكك السفلي للأمام وابقَ 10 ثوانٍ",
      "عد لوضعك الأصلي وكرر التمرين",
    ],
    
    cheekTitle: "تمرين عضلات الخد",
    cheekDesc: "لرفع وشد عضلات الخدين وإبراز عظام الوجنتين",
    cheekSteps: [
      "ابتسم بأوسع ما يمكنك مع إغلاق الشفاه",
      "اضغط بأصابعك برفق على أعلى الخدين",
      "حاول رفع خديك ضد الضغط لمدة 5 ثوانٍ",
    ],

    neckTitle: "تمرين شد الرقبة",
    neckDesc: "للتخلص من الذقن المزدوج وشد جلد الرقبة",
    neckSteps: [
      "أمِل رأسك للخلف وانظر للسقف",
      "اضغط لسانك على سقف الحلق",
      "ابقَ على هذه الوضعية 15 ثانية ثم استرخِ",
    ],

    eyeTitle: "تمرين محيط العينين",
    eyeDesc: "لتقليل الانتفاخ والهالات السوداء حول العينين",
    eyeSteps: [
      "ضع أصابعك بشكل V حول عينيك",
      "انظر للأعلى وحاول إغلاق عينيك ضد الضغط",
      "كرر 10 مرات مع الاسترخاء بين كل تكرار",
    ],

    lipTitle: "تمرين الشفاه والابتسامة",
    lipDesc: "لشد عضلات الشفاه ورسم ابتسامة جذابة",
    lipSteps: [
      "اضغط شفتيك معاً بقوة",
      "ابتسم بأقصى عرض ممكن مع إبقاء الشفاه مغلقة",
      "ابقَ 10 ثوانٍ ثم استرخِ",
    ],

    foreheadTitle: "تمرين الجبهة",
    foreheadDesc: "لتقليل تجاعيد الجبهة وشد البشرة",
    foreheadSteps: [
      "ضع أصابعك على جبهتك",
      "حاول رفع حاجبيك ضد ضغط أصابعك",
      "ابقَ 10 ثوانٍ وكرر 5 مرات",
    ],

    // Quotes
    quotes: [
      "ابدأ يومك بـ 10 دقائق وشاهد الفرق!",
      "وجهك يستحق العناية مثل جسمك",
      "الاستمرارية هي مفتاح النتائج",
      "كل يوم خطوة نحو ملامح أجمل",
    ],

    // Subscription
    subscriptionTitle: "الاشتراك",
    subscriptionSubtitle: "اختر خطة الاشتراك المناسبة لك",
    enterCode: "أدخل كود الاشتراك",
    codePlaceholder: "أدخل الكود هنا...",
    activate: "تفعيل",
    contactSales: "تواصل معنا",
    
    // Plans
    freePlan: "مجاني",
    freePlanPrice: "مجاناً",
    freePlanFeatures: ["3 تمارين أساسية", "محتوى محدود", "بدون دعم فني"],
    
    proPlan: "احترافي",
    proPlanPrice: "15,000 د.ع / شهرياً",
    proPlanFeatures: ["جميع التمارين", "محتوى حصري", "دعم فني على مدار الساعة", "تحديثات مستمرة"],
    
    premiumPlan: "مميز",
    premiumPlanPrice: "25,000 د.ع / شهرياً",
    premiumPlanFeatures: ["كل مميزات الاحترافي", "جلسات خاصة", "خطة تدريب مخصصة", "أولوية الدعم الفني"],

    // Admin
    adminLogin: "دخول لوحة التحكم",
    adminPassword: "كلمة المرور",
    adminPasswordPlaceholder: "أدخل كلمة المرور...",
    adminEnter: "دخول",
    adminWrongPassword: "كلمة المرور خاطئة!",
    adminPanel: "لوحة التحكم",
    totalUsers: "إجمالي المستخدمين",
    activeSubscriptions: "الاشتراكات الفعالة",
    generatedCodes: "الأكواد المُولّدة",
    generateCode: "توليد كود جديد",
    codeList: "قائمة الأكواد",
    code: "الكود",
    status: "الحالة",
    active: "فعال",
    used: "مستخدم",
    logout: "خروج",
    copyCode: "نسخ",
    copied: "تم النسخ!",
    deleteCode: "حذف",

    // Messages
    codeActivated: "تم تفعيل الكود بنجاح!",
    invalidCode: "الكود غير صالح أو مستخدم مسبقاً",
    
    // WhatsApp
    whatsappMessage: "مرحباً، أريد الاستفسار عن اشتراكات Sky Face",
  },
  en: {
    // Nav
    appName: "Sky Face",
    home: "Home",
    exercises: "Exercises",
    subscription: "Subscription",
    
    // Hero
    heroTitle: "Sky Face",
    heroSubtitle: "10 minutes to a sharper jawline and bold features.",
    heroDescription: "The most advanced facial exercise program to sculpt your features and bring out your natural beauty",
    getStarted: "Get Started",
    
    // Exercises
    exercisesTitle: "Facial Exercises",
    exercisesSubtitle: "Daily exercises carefully designed to improve your facial features",
    duration: "Duration",
    minutes: "min",
    reps: "Reps",
    times: "times",
    steps: "Steps",

    // Exercise items
    jawlineTitle: "Jawline Exercise",
    jawlineDesc: "Intensive exercise to sculpt and define your jawline clearly",
    jawlineSteps: [
      "Sit up straight and tilt your chin upward",
      "Push your lower jaw forward and hold for 10 seconds",
      "Return to starting position and repeat",
    ],
    
    cheekTitle: "Cheek Muscle Exercise",
    cheekDesc: "To lift and tighten cheek muscles and highlight cheekbones",
    cheekSteps: [
      "Smile as wide as possible with lips closed",
      "Gently press your fingers on top of your cheeks",
      "Try to lift your cheeks against the pressure for 5 seconds",
    ],

    neckTitle: "Neck Tightening Exercise",
    neckDesc: "To eliminate double chin and tighten neck skin",
    neckSteps: [
      "Tilt your head back and look at the ceiling",
      "Press your tongue against the roof of your mouth",
      "Hold this position for 15 seconds then relax",
    ],

    eyeTitle: "Eye Area Exercise",
    eyeDesc: "To reduce puffiness and dark circles around eyes",
    eyeSteps: [
      "Place your fingers in a V shape around your eyes",
      "Look upward and try to close your eyes against the pressure",
      "Repeat 10 times with rest between each rep",
    ],

    lipTitle: "Lips & Smile Exercise",
    lipDesc: "To tighten lip muscles and create an attractive smile",
    lipSteps: [
      "Press your lips together firmly",
      "Smile as wide as possible keeping lips closed",
      "Hold for 10 seconds then relax",
    ],

    foreheadTitle: "Forehead Exercise",
    foreheadDesc: "To reduce forehead wrinkles and tighten skin",
    foreheadSteps: [
      "Place your fingers on your forehead",
      "Try to raise your eyebrows against finger pressure",
      "Hold for 10 seconds and repeat 5 times",
    ],

    // Quotes
    quotes: [
      "Start your day with 10 minutes and see the difference!",
      "Your face deserves care just like your body",
      "Consistency is the key to results",
      "Every day a step toward more beautiful features",
    ],

    // Subscription
    subscriptionTitle: "Subscription",
    subscriptionSubtitle: "Choose the subscription plan that suits you",
    enterCode: "Enter Subscription Code",
    codePlaceholder: "Enter code here...",
    activate: "Activate",
    contactSales: "Contact Sales",

    // Plans
    freePlan: "Free",
    freePlanPrice: "Free",
    freePlanFeatures: ["3 basic exercises", "Limited content", "No support"],
    
    proPlan: "Professional",
    proPlanPrice: "15,000 IQD / month",
    proPlanFeatures: ["All exercises", "Exclusive content", "24/7 support", "Regular updates"],
    
    premiumPlan: "Premium",
    premiumPlanPrice: "25,000 IQD / month",
    premiumPlanFeatures: ["All Pro features", "Private sessions", "Custom training plan", "Priority support"],

    // Admin
    adminLogin: "Admin Login",
    adminPassword: "Password",
    adminPasswordPlaceholder: "Enter password...",
    adminEnter: "Login",
    adminWrongPassword: "Wrong password!",
    adminPanel: "Admin Panel",
    totalUsers: "Total Users",
    activeSubscriptions: "Active Subscriptions",
    generatedCodes: "Generated Codes",
    generateCode: "Generate New Code",
    codeList: "Code List",
    code: "Code",
    status: "Status",
    active: "Active",
    used: "Used",
    logout: "Logout",
    copyCode: "Copy",
    copied: "Copied!",
    deleteCode: "Delete",

    // Messages
    codeActivated: "Code activated successfully!",
    invalidCode: "Invalid or already used code",

    // WhatsApp
    whatsappMessage: "Hello, I want to inquire about Sky Face subscriptions",
  },
};

export type Translations = typeof translations.en;
export type TranslationKey = keyof Translations;
