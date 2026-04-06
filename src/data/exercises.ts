export interface Exercise {
  id: number;
  titleAr: string;
  titleEn: string;
  descAr: string;
  descEn: string;
  youtubeId: string;
  duration: number; // seconds
}

// Routine A — Jawline Focus (Odd Days: 1, 3, 5, ...)
export const routineA: Exercise[] = [
  {
    id: 1,
    titleAr: 'الإحماء',
    titleEn: 'Warmup',
    descAr: 'حركات تسخين لعضلات الوجه والرقبة لتحضير العضلات للتمرين',
    descEn: 'Warm up movements for face and neck muscles to prepare for the workout',
    youtubeId: 'WJ5S0E6Xf_8',
    duration: 120,
  },
  {
    id: 2,
    titleAr: 'تمرين الفك الأساسي',
    titleEn: 'Core Jawline Exercise',
    descAr: 'تمارين مكثفة لتقوية وتحديد خط الفك وإبراز الملامح',
    descEn: 'Intensive exercises to strengthen and define the jawline and enhance features',
    youtubeId: '1f_nd0vH578',
    duration: 300,
  },
  {
    id: 3,
    titleAr: 'تهدئة واسترخاء',
    titleEn: 'Cool-down',
    descAr: 'تمارين تهدئة لإرخاء عضلات الوجه بعد التمرين',
    descEn: 'Cool-down exercises to relax facial muscles after the workout',
    youtubeId: 'l4as6pX3f8E',
    duration: 120,
  },
];

// Routine B — Face Lift & Cheek Focus (Even Days: 2, 4, 6, ...)
export const routineB: Exercise[] = [
  {
    id: 1,
    titleAr: 'الإحماء',
    titleEn: 'Warmup',
    descAr: 'حركات إحماء لتنشيط عضلات الوجه والخدين',
    descEn: 'Warm up movements to activate face and cheek muscles',
    youtubeId: 'ndV96f0A83Y',
    duration: 120,
  },
  {
    id: 2,
    titleAr: 'تمرين شد الوجه والخدين',
    titleEn: 'Core Face Lift & Cheek Exercise',
    descAr: 'تمارين مكثفة لشد الوجه ونحت الخدين وإبراز عظام الوجنتين',
    descEn: 'Intensive exercises to lift the face, sculpt cheeks, and define cheekbones',
    youtubeId: 'm_P_H_P_6_k',
    duration: 300,
  },
  {
    id: 3,
    titleAr: 'تهدئة واسترخاء',
    titleEn: 'Cool-down',
    descAr: 'تمارين تهدئة لإرخاء عضلات الوجه بعد التمرين',
    descEn: 'Cool-down exercises to relax facial muscles after the workout',
    youtubeId: '3_H_Q_3_f_8',
    duration: 120,
  },
];

/**
 * Returns the exercise routine for a given day.
 * Odd days (1, 3, 5, ...) → Routine A (Jawline Focus)
 * Even days (2, 4, 6, ...) → Routine B (Face Lift & Cheek Focus)
 */
export function getRoutineForDay(day: number): Exercise[] {
  return day % 2 === 1 ? routineA : routineB;
}

/**
 * Returns the routine name key for a given day.
 */
export function getRoutineNameKey(day: number): 'jawlineFocus' | 'faceLiftCheek' {
  return day % 2 === 1 ? 'jawlineFocus' : 'faceLiftCheek';
}
