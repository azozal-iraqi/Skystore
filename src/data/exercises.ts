export interface Exercise {
  id: number;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  youtubeId: string;
  duration: number; // seconds
}

export const exercises: Exercise[] = [
  {
    id: 1,
    titleAr: 'الإحماء',
    titleEn: 'Warmup',
    descAr: 'حركات تسخين لعضلات الوجه والرقبة لتحضير العضلات للتمرين',
    descEn: 'Warm up movements for face and neck muscles to prepare for the workout',
    youtubeId: 'WJ5S0E6Xf_8',
    duration: 180,
  },
  {
    id: 2,
    titleAr: 'تمرين الفك',
    titleEn: 'Jawline Exercise',
    descAr: 'تمارين مكثفة لتقوية وتحديد خط الفك وإبراز الملامح',
    descEn: 'Intensive exercises to strengthen and define the jawline and enhance features',
    youtubeId: '1f_nd0vH578',
    duration: 300,
  },
  {
    id: 3,
    titleAr: 'نحت الوجه',
    titleEn: 'Face Sculpt',
    descAr: 'تمارين نحت متقدمة للوجه لشد البشرة وتحسين المظهر العام',
    descEn: 'Advanced face sculpting exercises to tighten skin and improve overall appearance',
    youtubeId: 'ndV96f0A83Y',
    duration: 240,
  },
];
