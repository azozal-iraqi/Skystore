export type Language = 'ar' | 'en';

export interface Translations {
  // App
  appName: string;
  tagline: string;
  taglineShort: string;

  // Nav
  home: string;
  workout: string;
  progress: string;
  subscribe: string;

  // Home
  welcomeBack: string;
  startJourney: string;
  day: string;
  dayNumber: (n: number) => string;
  free: string;
  locked: string;
  completed: string;
  current: string;
  minutes: string;
  dailyRoutine: string;
  selectDay: string;

  // Quotes
  quotes: string[];

  // Workout
  warmup: string;
  jawlineExercise: string;
  faceSculpt: string;
  exercise: string;
  exerciseOf: (current: number, total: number) => string;
  timeRemaining: string;
  startExercise: string;
  nextExercise: string;
  finishWorkout: string;
  pauseTimer: string;
  resumeTimer: string;
  greatJob: string;
  workoutComplete: string;
  dayCompleted: string;
  backToHome: string;

  // Exercise descriptions
  warmupDesc: string;
  jawlineDesc: string;
  sculptDesc: string;

  // Subscription
  premiumTitle: string;
  premiumSubtitle: string;
  premiumFeature1: string;
  premiumFeature2: string;
  premiumFeature3: string;
  premiumFeature4: string;
  contactSales: string;
  enterCode: string;
  enterCodePlaceholder: string;
  activateCode: string;
  invalidCode: string;
  codeActivated: string;
  alreadySubscribed: string;
  whatsappMessage: string;

  // Before/After
  beforeAfter: string;
  uploadBefore: string;
  uploadAfter: string;
  beforeLabel: string;
  afterLabel: string;
  noPhotosYet: string;
  clearPhotos: string;

  // Admin
  adminPanel: string;
  adminLogin: string;
  enterPasskey: string;
  login: string;
  logout: string;
  wrongPasskey: string;
  totalUsers: string;
  activeCodes: string;
  generateCode: string;
  generatedCode: string;
  copyCode: string;
  copied: string;
  resetAllUsers: string;
  resetConfirm: string;
  resetDone: string;
  adminDashboard: string;
  codeGenerator: string;
  userStats: string;
  completedDays: string;
  subscriptionStatus: string;
  active: string;
  inactive: string;
}

export const translations: Record<Language, Translations> = {
  ar: {
    appName: 'Sky Face',
    tagline: '10 دقائق لفك حاد وملامح بارزة',
    taglineShort: 'تمارين الوجه والفك',

    home: 'الرئيسية',
    workout: 'التمرين',
    progress: 'التقدم',
    subscribe: 'الاشتراك',

    welcomeBack: 'مرحباً بعودتك',
    startJourney: 'ابدأ رحلتك نحو ملامح أقوى',
    day: 'يوم',
    dayNumber: (n: number) => `اليوم ${n}`,
    free: 'مجاني',
    locked: 'مقفل',
    completed: 'مكتمل',
    current: 'الحالي',
    minutes: 'دقائق',
    dailyRoutine: 'روتين يومي',
    selectDay: 'اختر يومك',

    quotes: [
      'وجهك هو عنوان ثقتك',
      'الانضباط هو الجسر بين الأهداف والإنجازات',
      'كل يوم تتمرن فيه هو استثمار في نفسك',
      'ملامحك تعكس قوتك الداخلية',
      'لا تستسلم، النتائج قادمة',
      'التغيير يبدأ من أول خطوة',
    ],

    warmup: 'الإحماء',
    jawlineExercise: 'تمرين الفك',
    faceSculpt: 'نحت الوجه',
    exercise: 'تمرين',
    exerciseOf: (current: number, total: number) => `التمرين ${current} من ${total}`,
    timeRemaining: 'الوقت المتبقي',
    startExercise: 'ابدأ التمرين',
    nextExercise: 'التمرين التالي',
    finishWorkout: 'إنهاء التمرين',
    pauseTimer: 'إيقاف مؤقت',
    resumeTimer: 'استئناف',
    greatJob: 'أحسنت!',
    workoutComplete: 'اكتمل تمرين اليوم!',
    dayCompleted: 'لقد أكملت تمرين هذا اليوم بنجاح',
    backToHome: 'العودة للرئيسية',

    warmupDesc: 'حركات تسخين لعضلات الوجه والرقبة لتحضير العضلات للتمرين',
    jawlineDesc: 'تمارين مكثفة لتقوية وتحديد خط الفك وإبراز الملامح',
    sculptDesc: 'تمارين نحت متقدمة للوجه لشد البشرة وتحسين المظهر العام',

    premiumTitle: 'اشتراك بريميوم',
    premiumSubtitle: 'احصل على ٣٠ يوم من التمارين المتقدمة لتحديد ملامح الوجه',
    premiumFeature1: '٣٠ يوم من التمارين المتقدمة',
    premiumFeature2: 'تمارين حصرية لنحت الفك',
    premiumFeature3: 'متابعة التقدم اليومي',
    premiumFeature4: 'نتائج ملحوظة خلال أسبوعين',
    contactSales: 'تواصل مع المبيعات',
    enterCode: 'أدخل كود الاشتراك',
    enterCodePlaceholder: 'أدخل الكود المكون من 6 أرقام',
    activateCode: 'تفعيل الكود',
    invalidCode: 'الكود غير صحيح',
    codeActivated: 'تم تفعيل الاشتراك بنجاح!',
    alreadySubscribed: 'أنت مشترك بالفعل!',
    whatsappMessage: 'مرحباً، أريد الاشتراك في تطبيق Sky Face للحصول على تمارين الوجه المتقدمة',

    beforeAfter: 'قبل وبعد',
    uploadBefore: 'رفع صورة قبل',
    uploadAfter: 'رفع صورة بعد',
    beforeLabel: 'قبل',
    afterLabel: 'بعد',
    noPhotosYet: 'لم يتم رفع صور بعد',
    clearPhotos: 'مسح الصور',

    adminPanel: 'لوحة الإدارة',
    adminLogin: 'دخول الإدارة',
    enterPasskey: 'أدخل كلمة المرور',
    login: 'دخول',
    logout: 'خروج',
    wrongPasskey: 'كلمة المرور غير صحيحة',
    totalUsers: 'إجمالي المستخدمين',
    activeCodes: 'الأكواد النشطة',
    generateCode: 'توليد كود جديد',
    generatedCode: 'الكود المولد',
    copyCode: 'نسخ الكود',
    copied: 'تم النسخ!',
    resetAllUsers: 'إعادة تعيين جميع المستخدمين',
    resetConfirm: 'هل أنت متأكد من إعادة تعيين جميع البيانات؟',
    resetDone: 'تم إعادة التعيين بنجاح',
    adminDashboard: 'لوحة المعلومات',
    codeGenerator: 'مولد الأكواد',
    userStats: 'إحصائيات المستخدمين',
    completedDays: 'الأيام المكتملة',
    subscriptionStatus: 'حالة الاشتراك',
    active: 'نشط',
    inactive: 'غير نشط',
  },

  en: {
    appName: 'Sky Face',
    tagline: '10 minutes to a sharper jawline and bold features',
    taglineShort: 'Face & Jawline Exercises',

    home: 'Home',
    workout: 'Workout',
    progress: 'Progress',
    subscribe: 'Subscribe',

    welcomeBack: 'Welcome Back',
    startJourney: 'Start your journey to stronger features',
    day: 'Day',
    dayNumber: (n: number) => `Day ${n}`,
    free: 'Free',
    locked: 'Locked',
    completed: 'Completed',
    current: 'Current',
    minutes: 'minutes',
    dailyRoutine: 'Daily Routine',
    selectDay: 'Select Your Day',

    quotes: [
      'Your face is your identity',
      'Discipline is the bridge between goals and accomplishment',
      'Every day you train is an investment in yourself',
      'Your features reflect your inner strength',
      'Don\'t give up, results are coming',
      'Change starts with the first step',
    ],

    warmup: 'Warmup',
    jawlineExercise: 'Jawline Exercise',
    faceSculpt: 'Face Sculpt',
    exercise: 'Exercise',
    exerciseOf: (current: number, total: number) => `Exercise ${current} of ${total}`,
    timeRemaining: 'Time Remaining',
    startExercise: 'Start Exercise',
    nextExercise: 'Next Exercise',
    finishWorkout: 'Finish Workout',
    pauseTimer: 'Pause',
    resumeTimer: 'Resume',
    greatJob: 'Great Job!',
    workoutComplete: 'Today\'s Workout Complete!',
    dayCompleted: 'You\'ve successfully completed today\'s workout',
    backToHome: 'Back to Home',

    warmupDesc: 'Warm up movements for face and neck muscles to prepare for the workout',
    jawlineDesc: 'Intensive exercises to strengthen and define the jawline and enhance features',
    sculptDesc: 'Advanced face sculpting exercises to tighten skin and improve overall appearance',

    premiumTitle: 'Premium Subscription',
    premiumSubtitle: 'Get 30 days of advanced exercises for jawline definition',
    premiumFeature1: '30 days of advanced exercises',
    premiumFeature2: 'Exclusive jawline sculpting workouts',
    premiumFeature3: 'Daily progress tracking',
    premiumFeature4: 'Noticeable results within 2 weeks',
    contactSales: 'Contact Sales for Code',
    enterCode: 'Enter Subscription Code',
    enterCodePlaceholder: 'Enter 6-digit code',
    activateCode: 'Activate Code',
    invalidCode: 'Invalid code',
    codeActivated: 'Subscription activated successfully!',
    alreadySubscribed: 'You are already subscribed!',
    whatsappMessage: 'Hello, I want to subscribe to Sky Face app for advanced face exercises',

    beforeAfter: 'Before & After',
    uploadBefore: 'Upload Before',
    uploadAfter: 'Upload After',
    beforeLabel: 'Before',
    afterLabel: 'After',
    noPhotosYet: 'No photos uploaded yet',
    clearPhotos: 'Clear Photos',

    adminPanel: 'Admin Panel',
    adminLogin: 'Admin Login',
    enterPasskey: 'Enter Passkey',
    login: 'Login',
    logout: 'Logout',
    wrongPasskey: 'Wrong passkey',
    totalUsers: 'Total Users',
    activeCodes: 'Active Codes',
    generateCode: 'Generate New Code',
    generatedCode: 'Generated Code',
    copyCode: 'Copy Code',
    copied: 'Copied!',
    resetAllUsers: 'Reset All Users',
    resetConfirm: 'Are you sure you want to reset all data?',
    resetDone: 'Reset completed successfully',
    adminDashboard: 'Dashboard',
    codeGenerator: 'Code Generator',
    userStats: 'User Statistics',
    completedDays: 'Completed Days',
    subscriptionStatus: 'Subscription Status',
    active: 'Active',
    inactive: 'Inactive',
  },
};
