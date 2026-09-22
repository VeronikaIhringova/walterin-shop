/*
 * <quick-view-card>
 * Handles expand/collapse and variant selection for the Rhode-style in-card
 * quick view. Add-to-cart is delegated to the nested <product-form> element
 * (product-form.js), so there is no fetch logic here.
 */
if (!customElements.get('quick-view-card')) {
  customElements.define(
    'quick-view-card',
    class QuickViewCard extends HTMLElement {
      constructor() {
        super();
        this.onMouseEnter = this.expand.bind(this);
        this.onMouseLeave = this.collapse.bind(this);
        this.onKeyDown = this.handleKeyDown.bind(this);
        this.onClick = this.handleClick.bind(this);
      }

      connectedCallback() {
        this.panel = this.querySelector('[data-quick-view-panel]');
        if (!this.panel) return;

        this.variantInput = this.querySelector('.product-variant-id');
        this.label = this.querySelector('[data-qv-label]');
        this.buyButton = this.querySelector('[data-qv-buy]');
        this.buyLabel = this.querySelector('[data-qv-buy-label]');
        this.buyPrice = this.querySelector('[data-qv-buy-price]');
        this.buyTemplate = this.buyLabel ? this.buyLabel.textContent.trim() : '';

        this.desktopHover = window.matchMedia('(min-width: 990px) and (hover: hover)');

        this.injectTrigger();

        if (this.desktopHover.matches) {
          this.addEventListener('mouseenter', this.onMouseEnter);
          this.addEventListener('mouseleave', this.onMouseLeave);
        }

        this.addEventListener('click', this.onClick);
        document.addEventListener('keydown', this.onKeyDown);
      }

      disconnectedCallback() {
        this.removeEventListener('mouseenter', this.onMouseEnter);
        this.removeEventListener('mouseleave', this.onMouseLeave);
        this.removeEventListener('click', this.onClick);
        document.removeEventListener('keydown', this.onKeyDown);
      }

      injectTrigger() {
        // A "+" affordance for touch / no-hover devices (hidden on hover desktops via CSS).
        const trigger = document.createElement('button');
        trigger.type = 'button';
        trigger.className = 'quick-view__trigger';
        trigger.setAttribute('aria-label', 'Quick view');
        trigger.innerHTML = '<span aria-hidden="true">+</span>';
        trigger.addEventListener('click', (e) => {
          e.preventDefault();
          e.stopPropagation();
          this.toggle();
        });
        this.trigger = trigger;
        this.prepend(trigger);
      }

      handleClick(event) {
        const pill = event.target.closest('[data-qv-variant]');
        if (pill && this.contains(pill)) {
          event.preventDefault();
          this.selectVariant(pill);
          return;
        }

        if (event.target.closest('[data-qv-close]')) {
          event.preventDefault();
          this.collapse();
        }
      }

      handleKeyDown(event) {
        if (event.key === 'Escape' && this.classList.contains('is-expanded')) {
          this.collapse();
        }
      }

      toggle() {
        this.classList.toggle('is-expanded');
      }

      expand() {
        this.classList.add('is-expanded');
      }

      collapse() {
        this.classList.remove('is-expanded');
      }

      selectVariant(pill) {
        if (pill.dataset.qvSoldout) return;

        this.querySelectorAll('[data-qv-variant]').forEach((el) => {
          const selected = el === pill;
          el.classList.toggle('is-selected', selected);
          el.setAttribute('aria-checked', selected ? 'true' : 'false');
        });

        if (this.variantInput) this.variantInput.value = pill.dataset.qvVariant;
        if (this.label && pill.dataset.qvTitle) this.label.textContent = pill.dataset.qvTitle;
        if (this.buyPrice && pill.dataset.qvPrice) this.buyPrice.textContent = pill.dataset.qvPrice;
        if (this.buyLabel && this.buyTemplate) this.buyLabel.textContent = this.buyTemplate;
        if (this.buyButton) this.buyButton.removeAttribute('disabled');
      }
    }
  );
}
