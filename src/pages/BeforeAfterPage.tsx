import { useState, useEffect, useRef } from 'react';
import { Upload, Trash2, Camera } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function BeforeAfterPage() {
  const { t } = useLanguage();
  const [beforeImg, setBeforeImg] = useState<string | null>(null);
  const [afterImg, setAfterImg] = useState<string | null>(null);
  const beforeRef = useRef<HTMLInputElement>(null);
  const afterRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const savedBefore = localStorage.getItem('skyface_before');
    const savedAfter = localStorage.getItem('skyface_after');
    if (savedBefore) setBeforeImg(savedBefore);
    if (savedAfter) setAfterImg(savedAfter);
  }, []);

  const handleUpload = (type: 'before' | 'after', file: File) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (type === 'before') {
        setBeforeImg(result);
        localStorage.setItem('skyface_before', result);
      } else {
        setAfterImg(result);
        localStorage.setItem('skyface_after', result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleClear = () => {
    setBeforeImg(null);
    setAfterImg(null);
    localStorage.removeItem('skyface_before');
    localStorage.removeItem('skyface_after');
  };

  return (
    <div className="animate-fade-in pb-8">
      <div className="text-center mb-8">
        <Camera size={40} className="text-neon-blue mx-auto mb-3" />
        <h2 className="text-2xl font-bold text-white mb-2">{t.beforeAfter}</h2>
        <p className="text-gray-400 text-sm">{t.noPhotosYet}</p>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-8">
        {/* Before */}
        <div className="space-y-3">
          <h3 className="text-center font-semibold text-neon-blue">{t.beforeLabel}</h3>
          <div
            onClick={() => beforeRef.current?.click()}
            className="aspect-[3/4] rounded-2xl border-2 border-dashed border-white/10
              hover:border-neon-blue/30 transition-all duration-300 cursor-pointer
              flex items-center justify-center overflow-hidden bg-white/3"
          >
            {beforeImg ? (
              <img src={beforeImg} alt="Before" className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <div className="text-center">
                <Upload size={32} className="text-gray-600 mx-auto mb-2" />
                <p className="text-gray-600 text-xs">{t.uploadBefore}</p>
              </div>
            )}
          </div>
          <input
            ref={beforeRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) handleUpload('before', file);
            }}
          />
        </div>

        {/* After */}
        <div className="space-y-3">
          <h3 className="text-center font-semibold text-cyber-lime">{t.afterLabel}</h3>
          <div
            onClick={() => afterRef.current?.click()}
            className="aspect-[3/4] rounded-2xl border-2 border-dashed border-white/10
              hover:border-cyber-lime/30 transition-all duration-300 cursor-pointer
              flex items-center justify-center overflow-hidden bg-white/3"
          >
            {afterImg ? (
              <img src={afterImg} alt="After" className="w-full h-full object-cover rounded-2xl" />
            ) : (
              <div className="text-center">
                <Upload size={32} className="text-gray-600 mx-auto mb-2" />
                <p className="text-gray-600 text-xs">{t.uploadAfter}</p>
              </div>
            )}
          </div>
          <input
            ref={afterRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={e => {
              const file = e.target.files?.[0];
              if (file) handleUpload('after', file);
            }}
          />
        </div>
      </div>

      {(beforeImg || afterImg) && (
        <button
          onClick={handleClear}
          className="w-full py-3 rounded-xl border border-red-500/30 text-red-400
            hover:bg-red-500/10 transition-all duration-300 flex items-center justify-center gap-2"
        >
          <Trash2 size={16} />
          <span>{t.clearPhotos}</span>
        </button>
      )}
    </div>
  );
}
