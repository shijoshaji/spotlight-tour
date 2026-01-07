export interface TourStep {
  target: string;
  content: string;
  position?: 'top' | 'bottom' | 'left' | 'right';
}

export interface TourOptions {
  steps: TourStep[];
  onComplete?: () => void;
  onSkip?: () => void;
  completionModal?: {
    title?: string;
    body?: string;
    buttonText?: string;
  };
}

export class SpotlightTour {
  private steps: TourStep[];
  private currentStepIndex: number = -1;
  private overlay: HTMLElement | null = null;
  private tooltip: HTMLElement | null = null;
  private completionModal: HTMLElement | null = null;
  private options: TourOptions;

  constructor(options: TourOptions) {
    this.options = options;
    this.steps = options.steps;
    this.injectStyles();
  }

  private injectStyles() {
    const styleId = 'jojovms-spotlight-styles';
    if (document.getElementById(styleId)) return;

    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      .jojo-spotlight-overlay {
        position: fixed;
        box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.6);
        z-index: 9998;
        border-radius: 4px;
        pointer-events: none;
        transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        border: 2px solid rgba(255, 255, 255, 0.5);
      }
      .jojo-spotlight-tooltip {
        position: fixed;
        z-index: 9999;
        background: white;
        padding: 20px;
        border-radius: 12px;
        box-shadow: 0 8px 30px rgba(0,0,0,0.12);
        max-width: 320px;
        min-width: 250px;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.3s ease, transform 0.3s ease;
      }
      .jojo-spotlight-tooltip.visible {
        opacity: 1;
        transform: translateY(0);
      }
      .jojo-spotlight-content {
        margin-bottom: 15px;
        line-height: 1.5;
        color: #333;
        font-size: 14px;
      }
      .jojo-spotlight-footer {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-top: 1px solid #eee;
        padding-top: 10px;
      }
      .jojo-spotlight-progress {
        font-size: 12px;
        color: #888;
      }
      .jojo-spotlight-btn {
        padding: 8px 16px;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 13px;
        font-weight: 500;
        transition: background 0.2s;
      }
      .jojo-spotlight-next {
        background: #000;
        color: white;
      }
      .jojo-spotlight-next:hover {
        background: #333;
      }
      .jojo-spotlight-skip {
        background: transparent;
        color: #666;
      }
      .jojo-spotlight-skip:hover {
        color: #000;
        background: #f5f5f5;
      }

      /* Completion Modal Styles */
      .jojo-modal-overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        background: rgba(0, 0, 0, 0.5);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        opacity: 0;
        transition: opacity 0.3s ease;
      }
      .jojo-modal-overlay.visible {
        opacity: 1;
      }
      .jojo-modal-card {
        background: white;
        padding: 30px;
        border-radius: 16px;
        width: 90%;
        max-width: 400px;
        text-align: center;
        transform: scale(0.9);
        transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
        box-shadow: 0 20px 60px rgba(0,0,0,0.2);
      }
      .jojo-modal-overlay.visible .jojo-modal-card {
        transform: scale(1);
      }
      .jojo-modal-title {
        font-size: 24px;
        font-weight: 700;
        margin-bottom: 10px;
        color: #111;
      }
      .jojo-modal-body {
        font-size: 16px;
        color: #666;
        margin-bottom: 25px;
        line-height: 1.5;
      }
      .jojo-modal-btn {
        background: #000;
        color: white;
        padding: 12px 30px;
        border-radius: 8px;
        font-size: 16px;
        font-weight: 600;
        border: none;
        cursor: pointer;
        transition: transform 0.2s;
      }
      .jojo-modal-btn:hover {
        transform: translateY(-2px);
      }
    `;
    document.head.appendChild(style);
  }

  public start() {
    if (this.steps.length === 0) return;
    this.currentStepIndex = 0;
    this.createElements();
    this.render();
  }

  public next() {
    if (this.currentStepIndex < this.steps.length - 1) {
      this.currentStepIndex++;
      this.render();
    } else {
      this.finish();
    }
  }

  public prev() {
    if (this.currentStepIndex > 0) {
      this.currentStepIndex--;
      this.render();
    }
  }

  public stop() {
    this.currentStepIndex = -1;
    this.cleanup();
  }

  private finish() {
    this.cleanup();

    // Check if we should show completion modal
    if (this.options.completionModal) {
      this.showCompletionModal();
    } else {
      this.options.onComplete?.();
    }
  }

  private showCompletionModal() {
    const { title = "Tour Completed", body = "You are all set!", buttonText = "Done" } = this.options.completionModal || {};

    this.completionModal = document.createElement('div');
    this.completionModal.className = 'jojo-modal-overlay';
    this.completionModal.innerHTML = `
      <div class="jojo-modal-card">
        <div class="jojo-modal-title">${title}</div>
        <div class="jojo-modal-body">${body}</div>
        <button class="jojo-modal-btn">${buttonText}</button>
      </div>
    `;

    document.body.appendChild(this.completionModal);

    const btn = this.completionModal.querySelector('.jojo-modal-btn');
    btn?.addEventListener('click', () => {
      this.closeCompletionModal();
      this.options.onComplete?.();
    });

    // Animate in
    requestAnimationFrame(() => {
      this.completionModal?.classList.add('visible');
    });
  }

  private closeCompletionModal() {
    if (this.completionModal) {
      this.completionModal.classList.remove('visible');
      setTimeout(() => {
        this.completionModal?.remove();
        this.completionModal = null;
      }, 300);
    }
  }

  private createElements() {
    if (!this.overlay) {
      this.overlay = document.createElement('div');
      this.overlay.className = 'jojo-spotlight-overlay';
      document.body.appendChild(this.overlay);
    }
    if (!this.tooltip) {
      this.tooltip = document.createElement('div');
      this.tooltip.className = 'jojo-spotlight-tooltip';
      document.body.appendChild(this.tooltip);
    }
  }

  private render() {
    const step = this.steps[this.currentStepIndex];
    let targetEl = document.querySelector(step.target);

    // Fallback if target not found? For now just log and cleanup
    if (!targetEl) {
      console.warn(`SpotlightTour: Target ${step.target} not found`);
      // Optionally skip or stop
      return;
    }

    // Scroll into view nicely
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

    // Calculate position
    const rect = targetEl.getBoundingClientRect();

    // Update Overlay
    // We use Fixed position to handle scrolling better if we update on scroll, 
    // but here we just snapshot. 
    // Note: If the user scrolls manually, the fixed overlay might drift if we don't listen to scroll.
    // For MVP, we assume the scrollIntoView centers it and we place it there.
    if (this.overlay) {
      this.overlay.style.top = `${rect.top}px`;
      this.overlay.style.left = `${rect.left}px`;
      this.overlay.style.width = `${rect.width}px`;
      this.overlay.style.height = `${rect.height}px`;
    }

    // Update Tooltip
    if (this.tooltip) {
      // Content
      this.tooltip.innerHTML = `
        <div class="jojo-spotlight-content">${step.content}</div>
        <div class="jojo-spotlight-footer">
          <button class="jojo-spotlight-btn jojo-spotlight-skip">Skip</button>
          <div class="jojo-spotlight-progress">${this.currentStepIndex + 1} / ${this.steps.length}</div>
          <button class="jojo-spotlight-btn jojo-spotlight-next">${this.currentStepIndex === this.steps.length - 1 ? 'Finish' : 'Next'}</button>
        </div>
      `;

      // Calculate tooltip dimensions first
      const tooltipRect = this.tooltip.getBoundingClientRect();
      const gap = 12;
      // --- Smart Positioning Logic ---
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;
      const tooltipH = tooltipRect.height;
      const tooltipW = tooltipRect.width;

      // Define possible positions with their calculated coordinates and available space
      const positions: Record<string, { top: number; left: number; space: number; score: number }> = {
        top: {
          top: rect.top - tooltipH - gap,
          left: rect.left + (rect.width / 2) - (tooltipW / 2),
          space: rect.top - gap, // Space available above
          score: 1 // Default preference score
        },
        bottom: {
          top: rect.bottom + gap,
          left: rect.left + (rect.width / 2) - (tooltipW / 2),
          space: viewportHeight - (rect.bottom + gap), // Space available below
          score: 2 // Prefer bottom usually
        },
        left: {
          top: rect.top + (rect.height / 2) - (tooltipH / 2),
          left: rect.left - tooltipW - gap,
          space: rect.left - gap,
          score: 0
        },
        right: {
          top: rect.top + (rect.height / 2) - (tooltipH / 2),
          left: rect.right + gap,
          space: viewportWidth - (rect.right + gap),
          score: 0
        }
      };

      // 1. Determine preferred position (Explicit > Calculated)
      let currentPos: 'top' | 'bottom' | 'left' | 'right' = (step.position || 'bottom') as any;

      // 2. Check if preferred position fits. If not, pick best fitting one.
      // "Fits" means the calculated coordinate is within viewport (roughly) and there is enough 'space'
      const fits = (pos: 'top' | 'bottom' | 'left' | 'right') => {
        const p = positions[pos];
        if (pos === 'top') return p.space >= tooltipH && p.top >= 0;
        if (pos === 'bottom') return p.space >= tooltipH && (p.top + tooltipH) <= viewportHeight;
        // Simplified check for horizontal
        return true;
      };

      if (!fits(currentPos)) {
        // Find best fallback: Priority is fitting > space available > default preference
        const candidates = (['top', 'bottom', 'left', 'right'] as const)
          .filter(p => fits(p))
          .sort((a, b) => positions[b].score - positions[a].score); // Sort by preference

        if (candidates.length > 0) {
          currentPos = candidates[0];
        } else {
          // If NOTHING fits, pick the one with most space
          currentPos = ['top', 'bottom'].sort((a: any, b: any) => positions[b].space - positions[a].space)[0] as any;
        }
      }

      // 3. Apply coordinates
      let top = positions[currentPos].top;
      let left = positions[currentPos].left;

      // 4. Hard Constraints (prevent going off screen even if we picked best side)
      if (top < 10) top = 10;
      if (top + tooltipH > viewportHeight - 10) top = viewportHeight - tooltipH - 10;

      this.tooltip.setAttribute('data-position', currentPos);

      // Horizontal Centering
      left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);

      // Horizontal Boundary Checks
      // const viewportWidth = window.innerWidth;

      // Left boundary
      if (left < 10) left = 10;

      // Right boundary
      if (left + tooltipRect.width > viewportWidth - 10) {
        left = viewportWidth - tooltipRect.width - 10;
      }

      this.tooltip.style.top = `${top}px`;
      this.tooltip.style.left = `${left}px`;

      // Bind events
      const nextBtn = this.tooltip.querySelector('.jojo-spotlight-next');
      const skipBtn = this.tooltip.querySelector('.jojo-spotlight-skip');

      nextBtn?.addEventListener('click', () => this.next());
      skipBtn?.addEventListener('click', () => {
        this.stop();
        this.options.onSkip?.();
      });

      // Simple animation trigger
      requestAnimationFrame(() => {
        this.tooltip?.classList.add('visible');
      });
    }
  }

  private cleanup() {
    if (this.overlay) {
      this.overlay.remove();
      this.overlay = null;
    }
    if (this.tooltip) {
      this.tooltip.remove();
      this.tooltip = null;
    }
    // Note: We do NOT remove completion modal here, as it might need to be shown AFTER cleanup
  }
}
