import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface DownloadStore {
  lastDownloadTime: number | null;
  downloadCount: number;
  canDownload: () => boolean;
  recordDownload: () => void;
  resetDownloads: () => void;
}

export const useDownloadStore = create<DownloadStore>()(
  persist(
    (set, get) => ({
      lastDownloadTime: null,
      downloadCount: 0,

      canDownload: () => {
        const state = get();
        if (state.downloadCount < 5) return true;
        
        if (!state.lastDownloadTime) return true;
        
        const timeDiff = Date.now() - state.lastDownloadTime;
        const threeMinutes = 3 * 60 * 1000;
        
        return timeDiff >= threeMinutes;
      },

      recordDownload: () => {
        set((state) => ({
          downloadCount: state.downloadCount + 1,
          lastDownloadTime: Date.now()
        }));
      },

      resetDownloads: () => {
        set({ downloadCount: 0, lastDownloadTime: null });
      }
    }),
    {
      name: 'download-store'
    }
  )
);