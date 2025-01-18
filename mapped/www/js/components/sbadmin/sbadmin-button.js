export function load(ctx) {
  let componentName = 'sbadmin-button';
  let count = -1;
  customElements.define(componentName, class sbadmin_button extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

button {
  border-radius: 0;
  margin: 0;
  font-family: inherit;
  font-size: inherit;
  line-height: inherit;
  text-transform: none;
}

:host(.btn-group) {
  color: red;
}

button:focus:not(:focus-visible) {
  outline: 0;
}
[role=button] {
  cursor: pointer;
}
.btn {
  display: inline-block;
  font-weight: 400;
  line-height: 1;
  color: #69707a;
  text-align: center;
  vertical-align: middle;
  cursor: pointer;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  background-color: transparent;
  border: 1px solid transparent;
  padding: 0.875rem 1.125rem;
  font-size: 0.875rem;
  border-radius: 0.35rem;
  transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out, border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
@media (prefers-reduced-motion: reduce) {
  .btn {
    transition: none;
  }
}
.btn:hover {
  color: #69707a;
  text-decoration: none;
}
.btn-check:focus + .btn, .btn:focus {
  outline: 0;
  box-shadow: 0 0 0 0.25rem rgba(0, 97, 242, 0.25);
}
.btn:disabled, .btn.disabled, fieldset:disabled .btn {
  pointer-events: none;
  opacity: 0.65;
}

.btn-primary {
  color: #fff;
  background-color: #0061f2;
  border-color: #0061f2;
}
.btn-primary:hover {
  color: #fff;
  background-color: #0052ce;
  border-color: #004ec2;
}
.btn-check:focus + .btn-primary, .btn-primary:focus {
  color: #fff;
  background-color: #0052ce;
  border-color: #004ec2;
  box-shadow: 0 0 0 0.25rem rgba(38, 121, 244, 0.5);
}
.btn-check:checked + .btn-primary, .btn-check:active + .btn-primary, .btn-primary:active, .btn-primary.active, .show > .btn-primary.dropdown-toggle {
  color: #fff;
  background-color: #004ec2;
  border-color: #0049b6;
}
.btn-check:checked + .btn-primary:focus, .btn-check:active + .btn-primary:focus, .btn-primary:active:focus, .btn-primary.active:focus, .show > .btn-primary.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(38, 121, 244, 0.5);
}
.btn-primary:disabled, .btn-primary.disabled {
  color: #fff;
  background-color: #0061f2;
  border-color: #0061f2;
}

.btn-secondary {
  color: #fff;
  background-color: #6900c7;
  border-color: #6900c7;
}
.btn-secondary:hover {
  color: #fff;
  background-color: #5900a9;
  border-color: #54009f;
}
.btn-check:focus + .btn-secondary, .btn-secondary:focus {
  color: #fff;
  background-color: #5900a9;
  border-color: #54009f;
  box-shadow: 0 0 0 0.25rem rgba(128, 38, 207, 0.5);
}
.btn-check:checked + .btn-secondary, .btn-check:active + .btn-secondary, .btn-secondary:active, .btn-secondary.active, .show > .btn-secondary.dropdown-toggle {
  color: #fff;
  background-color: #54009f;
  border-color: #4f0095;
}
.btn-check:checked + .btn-secondary:focus, .btn-check:active + .btn-secondary:focus, .btn-secondary:active:focus, .btn-secondary.active:focus, .show > .btn-secondary.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(128, 38, 207, 0.5);
}
.btn-secondary:disabled, .btn-secondary.disabled {
  color: #fff;
  background-color: #6900c7;
  border-color: #6900c7;
}

.btn-success {
  color: #fff;
  background-color: #00ac69;
  border-color: #00ac69;
}
.btn-success:hover {
  color: #fff;
  background-color: #009259;
  border-color: #008a54;
}
.btn-check:focus + .btn-success, .btn-success:focus {
  color: #fff;
  background-color: #009259;
  border-color: #008a54;
  box-shadow: 0 0 0 0.25rem rgba(38, 184, 128, 0.5);
}
.btn-check:checked + .btn-success, .btn-check:active + .btn-success, .btn-success:active, .btn-success.active, .show > .btn-success.dropdown-toggle {
  color: #fff;
  background-color: #008a54;
  border-color: #00814f;
}
.btn-check:checked + .btn-success:focus, .btn-check:active + .btn-success:focus, .btn-success:active:focus, .btn-success.active:focus, .show > .btn-success.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(38, 184, 128, 0.5);
}
.btn-success:disabled, .btn-success.disabled {
  color: #fff;
  background-color: #00ac69;
  border-color: #00ac69;
}

.btn-info {
  color: #fff;
  background-color: #00cfd5;
  border-color: #00cfd5;
}
.btn-info:hover {
  color: #fff;
  background-color: #00b0b5;
  border-color: #00a6aa;
}
.btn-check:focus + .btn-info, .btn-info:focus {
  color: #fff;
  background-color: #00b0b5;
  border-color: #00a6aa;
  box-shadow: 0 0 0 0.25rem rgba(38, 214, 219, 0.5);
}
.btn-check:checked + .btn-info, .btn-check:active + .btn-info, .btn-info:active, .btn-info.active, .show > .btn-info.dropdown-toggle {
  color: #fff;
  background-color: #00a6aa;
  border-color: #009ba0;
}
.btn-check:checked + .btn-info:focus, .btn-check:active + .btn-info:focus, .btn-info:active:focus, .btn-info.active:focus, .show > .btn-info.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(38, 214, 219, 0.5);
}
.btn-info:disabled, .btn-info.disabled {
  color: #fff;
  background-color: #00cfd5;
  border-color: #00cfd5;
}

.btn-warning {
  color: #fff;
  background-color: #f4a100;
  border-color: #f4a100;
}
.btn-warning:hover {
  color: #fff;
  background-color: #cf8900;
  border-color: #c38100;
}
.btn-check:focus + .btn-warning, .btn-warning:focus {
  color: #fff;
  background-color: #cf8900;
  border-color: #c38100;
  box-shadow: 0 0 0 0.25rem rgba(246, 175, 38, 0.5);
}
.btn-check:checked + .btn-warning, .btn-check:active + .btn-warning, .btn-warning:active, .btn-warning.active, .show > .btn-warning.dropdown-toggle {
  color: #fff;
  background-color: #c38100;
  border-color: #b77900;
}
.btn-check:checked + .btn-warning:focus, .btn-check:active + .btn-warning:focus, .btn-warning:active:focus, .btn-warning.active:focus, .show > .btn-warning.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(246, 175, 38, 0.5);
}
.btn-warning:disabled, .btn-warning.disabled {
  color: #fff;
  background-color: #f4a100;
  border-color: #f4a100;
}

.btn-danger {
  color: #fff;
  background-color: #e81500;
  border-color: #e81500;
}
.btn-danger:hover {
  color: #fff;
  background-color: #c51200;
  border-color: #ba1100;
}
.btn-check:focus + .btn-danger, .btn-danger:focus {
  color: #fff;
  background-color: #c51200;
  border-color: #ba1100;
  box-shadow: 0 0 0 0.25rem rgba(235, 56, 38, 0.5);
}
.btn-check:checked + .btn-danger, .btn-check:active + .btn-danger, .btn-danger:active, .btn-danger.active, .show > .btn-danger.dropdown-toggle {
  color: #fff;
  background-color: #ba1100;
  border-color: #ae1000;
}
.btn-check:checked + .btn-danger:focus, .btn-check:active + .btn-danger:focus, .btn-danger:active:focus, .btn-danger.active:focus, .show > .btn-danger.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(235, 56, 38, 0.5);
}
.btn-danger:disabled, .btn-danger.disabled {
  color: #fff;
  background-color: #e81500;
  border-color: #e81500;
}

.btn-light {
  color: #000;
  background-color: #f2f6fc;
  border-color: #f2f6fc;
}
.btn-light:hover {
  color: #000;
  background-color: #f4f7fc;
  border-color: #f3f7fc;
}
.btn-check:focus + .btn-light, .btn-light:focus {
  color: #000;
  background-color: #f4f7fc;
  border-color: #f3f7fc;
  box-shadow: 0 0 0 0.25rem rgba(206, 209, 214, 0.5);
}
.btn-check:checked + .btn-light, .btn-check:active + .btn-light, .btn-light:active, .btn-light.active, .show > .btn-light.dropdown-toggle {
  color: #000;
  background-color: #f5f8fd;
  border-color: #f3f7fc;
}
.btn-check:checked + .btn-light:focus, .btn-check:active + .btn-light:focus, .btn-light:active:focus, .btn-light.active:focus, .show > .btn-light.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(206, 209, 214, 0.5);
}
.btn-light:disabled, .btn-light.disabled {
  color: #000;
  background-color: #f2f6fc;
  border-color: #f2f6fc;
}

.btn-dark {
  color: #fff;
  background-color: #212832;
  border-color: #212832;
}
.btn-dark:hover {
  color: #fff;
  background-color: #1c222b;
  border-color: #1a2028;
}
.btn-check:focus + .btn-dark, .btn-dark:focus {
  color: #fff;
  background-color: #1c222b;
  border-color: #1a2028;
  box-shadow: 0 0 0 0.25rem rgba(66, 72, 81, 0.5);
}
.btn-check:checked + .btn-dark, .btn-check:active + .btn-dark, .btn-dark:active, .btn-dark.active, .show > .btn-dark.dropdown-toggle {
  color: #fff;
  background-color: #1a2028;
  border-color: #191e26;
}
.btn-check:checked + .btn-dark:focus, .btn-check:active + .btn-dark:focus, .btn-dark:active:focus, .btn-dark.active:focus, .show > .btn-dark.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(66, 72, 81, 0.5);
}
.btn-dark:disabled, .btn-dark.disabled {
  color: #fff;
  background-color: #212832;
  border-color: #212832;
}

.btn-black {
  color: #fff;
  background-color: #000;
  border-color: #000;
}
.btn-black:hover {
  color: #fff;
  background-color: black;
  border-color: black;
}
.btn-check:focus + .btn-black, .btn-black:focus {
  color: #fff;
  background-color: black;
  border-color: black;
  box-shadow: 0 0 0 0.25rem rgba(38, 38, 38, 0.5);
}
.btn-check:checked + .btn-black, .btn-check:active + .btn-black, .btn-black:active, .btn-black.active, .show > .btn-black.dropdown-toggle {
  color: #fff;
  background-color: black;
  border-color: black;
}
.btn-check:checked + .btn-black:focus, .btn-check:active + .btn-black:focus, .btn-black:active:focus, .btn-black.active:focus, .show > .btn-black.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(38, 38, 38, 0.5);
}
.btn-black:disabled, .btn-black.disabled {
  color: #fff;
  background-color: #000;
  border-color: #000;
}

.btn-white {
  color: #000;
  background-color: #fff;
  border-color: #fff;
}
.btn-white:hover {
  color: #000;
  background-color: white;
  border-color: white;
}
.btn-check:focus + .btn-white, .btn-white:focus {
  color: #000;
  background-color: white;
  border-color: white;
  box-shadow: 0 0 0 0.25rem rgba(217, 217, 217, 0.5);
}
.btn-check:checked + .btn-white, .btn-check:active + .btn-white, .btn-white:active, .btn-white.active, .show > .btn-white.dropdown-toggle {
  color: #000;
  background-color: white;
  border-color: white;
}
.btn-check:checked + .btn-white:focus, .btn-check:active + .btn-white:focus, .btn-white:active:focus, .btn-white.active:focus, .show > .btn-white.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(217, 217, 217, 0.5);
}
.btn-white:disabled, .btn-white.disabled {
  color: #000;
  background-color: #fff;
  border-color: #fff;
}

.btn-red {
  color: #fff;
  background-color: #e81500;
  border-color: #e81500;
}
.btn-red:hover {
  color: #fff;
  background-color: #c51200;
  border-color: #ba1100;
}
.btn-check:focus + .btn-red, .btn-red:focus {
  color: #fff;
  background-color: #c51200;
  border-color: #ba1100;
  box-shadow: 0 0 0 0.25rem rgba(235, 56, 38, 0.5);
}
.btn-check:checked + .btn-red, .btn-check:active + .btn-red, .btn-red:active, .btn-red.active, .show > .btn-red.dropdown-toggle {
  color: #fff;
  background-color: #ba1100;
  border-color: #ae1000;
}
.btn-check:checked + .btn-red:focus, .btn-check:active + .btn-red:focus, .btn-red:active:focus, .btn-red.active:focus, .show > .btn-red.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(235, 56, 38, 0.5);
}
.btn-red:disabled, .btn-red.disabled {
  color: #fff;
  background-color: #e81500;
  border-color: #e81500;
}

.btn-orange {
  color: #fff;
  background-color: #f76400;
  border-color: #f76400;
}
.btn-orange:hover {
  color: #fff;
  background-color: #d25500;
  border-color: #c65000;
}
.btn-check:focus + .btn-orange, .btn-orange:focus {
  color: #fff;
  background-color: #d25500;
  border-color: #c65000;
  box-shadow: 0 0 0 0.25rem rgba(248, 123, 38, 0.5);
}
.btn-check:checked + .btn-orange, .btn-check:active + .btn-orange, .btn-orange:active, .btn-orange.active, .show > .btn-orange.dropdown-toggle {
  color: #fff;
  background-color: #c65000;
  border-color: #b94b00;
}
.btn-check:checked + .btn-orange:focus, .btn-check:active + .btn-orange:focus, .btn-orange:active:focus, .btn-orange.active:focus, .show > .btn-orange.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(248, 123, 38, 0.5);
}
.btn-orange:disabled, .btn-orange.disabled {
  color: #fff;
  background-color: #f76400;
  border-color: #f76400;
}

.btn-yellow {
  color: #fff;
  background-color: #f4a100;
  border-color: #f4a100;
}
.btn-yellow:hover {
  color: #fff;
  background-color: #cf8900;
  border-color: #c38100;
}
.btn-check:focus + .btn-yellow, .btn-yellow:focus {
  color: #fff;
  background-color: #cf8900;
  border-color: #c38100;
  box-shadow: 0 0 0 0.25rem rgba(246, 175, 38, 0.5);
}
.btn-check:checked + .btn-yellow, .btn-check:active + .btn-yellow, .btn-yellow:active, .btn-yellow.active, .show > .btn-yellow.dropdown-toggle {
  color: #fff;
  background-color: #c38100;
  border-color: #b77900;
}
.btn-check:checked + .btn-yellow:focus, .btn-check:active + .btn-yellow:focus, .btn-yellow:active:focus, .btn-yellow.active:focus, .show > .btn-yellow.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(246, 175, 38, 0.5);
}
.btn-yellow:disabled, .btn-yellow.disabled {
  color: #fff;
  background-color: #f4a100;
  border-color: #f4a100;
}

.btn-green {
  color: #fff;
  background-color: #00ac69;
  border-color: #00ac69;
}
.btn-green:hover {
  color: #fff;
  background-color: #009259;
  border-color: #008a54;
}
.btn-check:focus + .btn-green, .btn-green:focus {
  color: #fff;
  background-color: #009259;
  border-color: #008a54;
  box-shadow: 0 0 0 0.25rem rgba(38, 184, 128, 0.5);
}
.btn-check:checked + .btn-green, .btn-check:active + .btn-green, .btn-green:active, .btn-green.active, .show > .btn-green.dropdown-toggle {
  color: #fff;
  background-color: #008a54;
  border-color: #00814f;
}
.btn-check:checked + .btn-green:focus, .btn-check:active + .btn-green:focus, .btn-green:active:focus, .btn-green.active:focus, .show > .btn-green.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(38, 184, 128, 0.5);
}
.btn-green:disabled, .btn-green.disabled {
  color: #fff;
  background-color: #00ac69;
  border-color: #00ac69;
}

.btn-teal {
  color: #fff;
  background-color: #00ba94;
  border-color: #00ba94;
}
.btn-teal:hover {
  color: #fff;
  background-color: #009e7e;
  border-color: #009576;
}
.btn-check:focus + .btn-teal, .btn-teal:focus {
  color: #fff;
  background-color: #009e7e;
  border-color: #009576;
  box-shadow: 0 0 0 0.25rem rgba(38, 196, 164, 0.5);
}
.btn-check:checked + .btn-teal, .btn-check:active + .btn-teal, .btn-teal:active, .btn-teal.active, .show > .btn-teal.dropdown-toggle {
  color: #fff;
  background-color: #009576;
  border-color: #008c6f;
}
.btn-check:checked + .btn-teal:focus, .btn-check:active + .btn-teal:focus, .btn-teal:active:focus, .btn-teal.active:focus, .show > .btn-teal.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(38, 196, 164, 0.5);
}
.btn-teal:disabled, .btn-teal.disabled {
  color: #fff;
  background-color: #00ba94;
  border-color: #00ba94;
}

.btn-cyan {
  color: #fff;
  background-color: #00cfd5;
  border-color: #00cfd5;
}
.btn-cyan:hover {
  color: #fff;
  background-color: #00b0b5;
  border-color: #00a6aa;
}
.btn-check:focus + .btn-cyan, .btn-cyan:focus {
  color: #fff;
  background-color: #00b0b5;
  border-color: #00a6aa;
  box-shadow: 0 0 0 0.25rem rgba(38, 214, 219, 0.5);
}
.btn-check:checked + .btn-cyan, .btn-check:active + .btn-cyan, .btn-cyan:active, .btn-cyan.active, .show > .btn-cyan.dropdown-toggle {
  color: #fff;
  background-color: #00a6aa;
  border-color: #009ba0;
}
.btn-check:checked + .btn-cyan:focus, .btn-check:active + .btn-cyan:focus, .btn-cyan:active:focus, .btn-cyan.active:focus, .show > .btn-cyan.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(38, 214, 219, 0.5);
}
.btn-cyan:disabled, .btn-cyan.disabled {
  color: #fff;
  background-color: #00cfd5;
  border-color: #00cfd5;
}

.btn-blue {
  color: #fff;
  background-color: #0061f2;
  border-color: #0061f2;
}
.btn-blue:hover {
  color: #fff;
  background-color: #0052ce;
  border-color: #004ec2;
}
.btn-check:focus + .btn-blue, .btn-blue:focus {
  color: #fff;
  background-color: #0052ce;
  border-color: #004ec2;
  box-shadow: 0 0 0 0.25rem rgba(38, 121, 244, 0.5);
}
.btn-check:checked + .btn-blue, .btn-check:active + .btn-blue, .btn-blue:active, .btn-blue.active, .show > .btn-blue.dropdown-toggle {
  color: #fff;
  background-color: #004ec2;
  border-color: #0049b6;
}
.btn-check:checked + .btn-blue:focus, .btn-check:active + .btn-blue:focus, .btn-blue:active:focus, .btn-blue.active:focus, .show > .btn-blue.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(38, 121, 244, 0.5);
}
.btn-blue:disabled, .btn-blue.disabled {
  color: #fff;
  background-color: #0061f2;
  border-color: #0061f2;
}

.btn-indigo {
  color: #fff;
  background-color: #5800e8;
  border-color: #5800e8;
}
.btn-indigo:hover {
  color: #fff;
  background-color: #4b00c5;
  border-color: #4600ba;
}
.btn-check:focus + .btn-indigo, .btn-indigo:focus {
  color: #fff;
  background-color: #4b00c5;
  border-color: #4600ba;
  box-shadow: 0 0 0 0.25rem rgba(113, 38, 235, 0.5);
}
.btn-check:checked + .btn-indigo, .btn-check:active + .btn-indigo, .btn-indigo:active, .btn-indigo.active, .show > .btn-indigo.dropdown-toggle {
  color: #fff;
  background-color: #4600ba;
  border-color: #4200ae;
}
.btn-check:checked + .btn-indigo:focus, .btn-check:active + .btn-indigo:focus, .btn-indigo:active:focus, .btn-indigo.active:focus, .show > .btn-indigo.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(113, 38, 235, 0.5);
}
.btn-indigo:disabled, .btn-indigo.disabled {
  color: #fff;
  background-color: #5800e8;
  border-color: #5800e8;
}

.btn-purple {
  color: #fff;
  background-color: #6900c7;
  border-color: #6900c7;
}
.btn-purple:hover {
  color: #fff;
  background-color: #5900a9;
  border-color: #54009f;
}
.btn-check:focus + .btn-purple, .btn-purple:focus {
  color: #fff;
  background-color: #5900a9;
  border-color: #54009f;
  box-shadow: 0 0 0 0.25rem rgba(128, 38, 207, 0.5);
}
.btn-check:checked + .btn-purple, .btn-check:active + .btn-purple, .btn-purple:active, .btn-purple.active, .show > .btn-purple.dropdown-toggle {
  color: #fff;
  background-color: #54009f;
  border-color: #4f0095;
}
.btn-check:checked + .btn-purple:focus, .btn-check:active + .btn-purple:focus, .btn-purple:active:focus, .btn-purple.active:focus, .show > .btn-purple.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(128, 38, 207, 0.5);
}
.btn-purple:disabled, .btn-purple.disabled {
  color: #fff;
  background-color: #6900c7;
  border-color: #6900c7;
}

.btn-pink {
  color: #fff;
  background-color: #e30059;
  border-color: #e30059;
}
.btn-pink:hover {
  color: #fff;
  background-color: #c1004c;
  border-color: #b60047;
}
.btn-check:focus + .btn-pink, .btn-pink:focus {
  color: #fff;
  background-color: #c1004c;
  border-color: #b60047;
  box-shadow: 0 0 0 0.25rem rgba(231, 38, 114, 0.5);
}
.btn-check:checked + .btn-pink, .btn-check:active + .btn-pink, .btn-pink:active, .btn-pink.active, .show > .btn-pink.dropdown-toggle {
  color: #fff;
  background-color: #b60047;
  border-color: #aa0043;
}
.btn-check:checked + .btn-pink:focus, .btn-check:active + .btn-pink:focus, .btn-pink:active:focus, .btn-pink.active:focus, .show > .btn-pink.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(231, 38, 114, 0.5);
}
.btn-pink:disabled, .btn-pink.disabled {
  color: #fff;
  background-color: #e30059;
  border-color: #e30059;
}

.btn-red-soft {
  color: #000;
  background-color: #f1e0e3;
  border-color: #f1e0e3;
}
.btn-red-soft:hover {
  color: #000;
  background-color: #f3e5e7;
  border-color: #f2e3e6;
}
.btn-check:focus + .btn-red-soft, .btn-red-soft:focus {
  color: #000;
  background-color: #f3e5e7;
  border-color: #f2e3e6;
  box-shadow: 0 0 0 0.25rem rgba(205, 190, 193, 0.5);
}
.btn-check:checked + .btn-red-soft, .btn-check:active + .btn-red-soft, .btn-red-soft:active, .btn-red-soft.active, .show > .btn-red-soft.dropdown-toggle {
  color: #000;
  background-color: #f4e6e9;
  border-color: #f2e3e6;
}
.btn-check:checked + .btn-red-soft:focus, .btn-check:active + .btn-red-soft:focus, .btn-red-soft:active:focus, .btn-red-soft.active:focus, .show > .btn-red-soft.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(205, 190, 193, 0.5);
}
.btn-red-soft:disabled, .btn-red-soft.disabled {
  color: #000;
  background-color: #f1e0e3;
  border-color: #f1e0e3;
}

.btn-orange-soft {
  color: #000;
  background-color: #f3e7e3;
  border-color: #f3e7e3;
}
.btn-orange-soft:hover {
  color: #000;
  background-color: #f5ebe7;
  border-color: #f4e9e6;
}
.btn-check:focus + .btn-orange-soft, .btn-orange-soft:focus {
  color: #000;
  background-color: #f5ebe7;
  border-color: #f4e9e6;
  box-shadow: 0 0 0 0.25rem rgba(207, 196, 193, 0.5);
}
.btn-check:checked + .btn-orange-soft, .btn-check:active + .btn-orange-soft, .btn-orange-soft:active, .btn-orange-soft.active, .show > .btn-orange-soft.dropdown-toggle {
  color: #000;
  background-color: #f5ece9;
  border-color: #f4e9e6;
}
.btn-check:checked + .btn-orange-soft:focus, .btn-check:active + .btn-orange-soft:focus, .btn-orange-soft:active:focus, .btn-orange-soft.active:focus, .show > .btn-orange-soft.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(207, 196, 193, 0.5);
}
.btn-orange-soft:disabled, .btn-orange-soft.disabled {
  color: #000;
  background-color: #f3e7e3;
  border-color: #f3e7e3;
}

.btn-yellow-soft {
  color: #000;
  background-color: #f2eee3;
  border-color: #f2eee3;
}
.btn-yellow-soft:hover {
  color: #000;
  background-color: #f4f1e7;
  border-color: #f3f0e6;
}
.btn-check:focus + .btn-yellow-soft, .btn-yellow-soft:focus {
  color: #000;
  background-color: #f4f1e7;
  border-color: #f3f0e6;
  box-shadow: 0 0 0 0.25rem rgba(206, 202, 193, 0.5);
}
.btn-check:checked + .btn-yellow-soft, .btn-check:active + .btn-yellow-soft, .btn-yellow-soft:active, .btn-yellow-soft.active, .show > .btn-yellow-soft.dropdown-toggle {
  color: #000;
  background-color: #f5f1e9;
  border-color: #f3f0e6;
}
.btn-check:checked + .btn-yellow-soft:focus, .btn-check:active + .btn-yellow-soft:focus, .btn-yellow-soft:active:focus, .btn-yellow-soft.active:focus, .show > .btn-yellow-soft.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(206, 202, 193, 0.5);
}
.btn-yellow-soft:disabled, .btn-yellow-soft.disabled {
  color: #000;
  background-color: #f2eee3;
  border-color: #f2eee3;
}

.btn-green-soft {
  color: #000;
  background-color: #daefed;
  border-color: #daefed;
}
.btn-green-soft:hover {
  color: #000;
  background-color: #e0f1f0;
  border-color: #def1ef;
}
.btn-check:focus + .btn-green-soft, .btn-green-soft:focus {
  color: #000;
  background-color: #e0f1f0;
  border-color: #def1ef;
  box-shadow: 0 0 0 0.25rem rgba(185, 203, 201, 0.5);
}
.btn-check:checked + .btn-green-soft, .btn-check:active + .btn-green-soft, .btn-green-soft:active, .btn-green-soft.active, .show > .btn-green-soft.dropdown-toggle {
  color: #000;
  background-color: #e1f2f1;
  border-color: #def1ef;
}
.btn-check:checked + .btn-green-soft:focus, .btn-check:active + .btn-green-soft:focus, .btn-green-soft:active:focus, .btn-green-soft.active:focus, .show > .btn-green-soft.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(185, 203, 201, 0.5);
}
.btn-green-soft:disabled, .btn-green-soft.disabled {
  color: #000;
  background-color: #daefed;
  border-color: #daefed;
}

.btn-teal-soft {
  color: #000;
  background-color: #daf0f2;
  border-color: #daf0f2;
}
.btn-teal-soft:hover {
  color: #000;
  background-color: #e0f2f4;
  border-color: #def2f3;
}
.btn-check:focus + .btn-teal-soft, .btn-teal-soft:focus {
  color: #000;
  background-color: #e0f2f4;
  border-color: #def2f3;
  box-shadow: 0 0 0 0.25rem rgba(185, 204, 206, 0.5);
}
.btn-check:checked + .btn-teal-soft, .btn-check:active + .btn-teal-soft, .btn-teal-soft:active, .btn-teal-soft.active, .show > .btn-teal-soft.dropdown-toggle {
  color: #000;
  background-color: #e1f3f5;
  border-color: #def2f3;
}
.btn-check:checked + .btn-teal-soft:focus, .btn-check:active + .btn-teal-soft:focus, .btn-teal-soft:active:focus, .btn-teal-soft.active:focus, .show > .btn-teal-soft.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(185, 204, 206, 0.5);
}
.btn-teal-soft:disabled, .btn-teal-soft.disabled {
  color: #000;
  background-color: #daf0f2;
  border-color: #daf0f2;
}

.btn-cyan-soft {
  color: #000;
  background-color: #daf2f8;
  border-color: #daf2f8;
}
.btn-cyan-soft:hover {
  color: #000;
  background-color: #e0f4f9;
  border-color: #def3f9;
}
.btn-check:focus + .btn-cyan-soft, .btn-cyan-soft:focus {
  color: #000;
  background-color: #e0f4f9;
  border-color: #def3f9;
  box-shadow: 0 0 0 0.25rem rgba(185, 206, 211, 0.5);
}
.btn-check:checked + .btn-cyan-soft, .btn-check:active + .btn-cyan-soft, .btn-cyan-soft:active, .btn-cyan-soft.active, .show > .btn-cyan-soft.dropdown-toggle {
  color: #000;
  background-color: #e1f5f9;
  border-color: #def3f9;
}
.btn-check:checked + .btn-cyan-soft:focus, .btn-check:active + .btn-cyan-soft:focus, .btn-cyan-soft:active:focus, .btn-cyan-soft.active:focus, .show > .btn-cyan-soft.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(185, 206, 211, 0.5);
}
.btn-cyan-soft:disabled, .btn-cyan-soft.disabled {
  color: #000;
  background-color: #daf2f8;
  border-color: #daf2f8;
}

.btn-blue-soft {
  color: #000;
  background-color: #dae7fb;
  border-color: #dae7fb;
}
.btn-blue-soft:hover {
  color: #000;
  background-color: #e0ebfc;
  border-color: #dee9fb;
}
.btn-check:focus + .btn-blue-soft, .btn-blue-soft:focus {
  color: #000;
  background-color: #e0ebfc;
  border-color: #dee9fb;
  box-shadow: 0 0 0 0.25rem rgba(185, 196, 213, 0.5);
}
.btn-check:checked + .btn-blue-soft, .btn-check:active + .btn-blue-soft, .btn-blue-soft:active, .btn-blue-soft.active, .show > .btn-blue-soft.dropdown-toggle {
  color: #000;
  background-color: #e1ecfc;
  border-color: #dee9fb;
}
.btn-check:checked + .btn-blue-soft:focus, .btn-check:active + .btn-blue-soft:focus, .btn-blue-soft:active:focus, .btn-blue-soft.active:focus, .show > .btn-blue-soft.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(185, 196, 213, 0.5);
}
.btn-blue-soft:disabled, .btn-blue-soft.disabled {
  color: #000;
  background-color: #dae7fb;
  border-color: #dae7fb;
}

.btn-indigo-soft {
  color: #000;
  background-color: #e3ddfa;
  border-color: #e3ddfa;
}
.btn-indigo-soft:hover {
  color: #000;
  background-color: #e7e2fb;
  border-color: #e6e0fb;
}
.btn-check:focus + .btn-indigo-soft, .btn-indigo-soft:focus {
  color: #000;
  background-color: #e7e2fb;
  border-color: #e6e0fb;
  box-shadow: 0 0 0 0.25rem rgba(193, 188, 213, 0.5);
}
.btn-check:checked + .btn-indigo-soft, .btn-check:active + .btn-indigo-soft, .btn-indigo-soft:active, .btn-indigo-soft.active, .show > .btn-indigo-soft.dropdown-toggle {
  color: #000;
  background-color: #e9e4fb;
  border-color: #e6e0fb;
}
.btn-check:checked + .btn-indigo-soft:focus, .btn-check:active + .btn-indigo-soft:focus, .btn-indigo-soft:active:focus, .btn-indigo-soft.active:focus, .show > .btn-indigo-soft.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(193, 188, 213, 0.5);
}
.btn-indigo-soft:disabled, .btn-indigo-soft.disabled {
  color: #000;
  background-color: #e3ddfa;
  border-color: #e3ddfa;
}

.btn-purple-soft {
  color: #000;
  background-color: #e4ddf7;
  border-color: #e4ddf7;
}
.btn-purple-soft:hover {
  color: #000;
  background-color: #e8e2f8;
  border-color: #e7e0f8;
}
.btn-check:focus + .btn-purple-soft, .btn-purple-soft:focus {
  color: #000;
  background-color: #e8e2f8;
  border-color: #e7e0f8;
  box-shadow: 0 0 0 0.25rem rgba(194, 188, 210, 0.5);
}
.btn-check:checked + .btn-purple-soft, .btn-check:active + .btn-purple-soft, .btn-purple-soft:active, .btn-purple-soft.active, .show > .btn-purple-soft.dropdown-toggle {
  color: #000;
  background-color: #e9e4f9;
  border-color: #e7e0f8;
}
.btn-check:checked + .btn-purple-soft:focus, .btn-check:active + .btn-purple-soft:focus, .btn-purple-soft:active:focus, .btn-purple-soft.active:focus, .show > .btn-purple-soft.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(194, 188, 210, 0.5);
}
.btn-purple-soft:disabled, .btn-purple-soft.disabled {
  color: #000;
  background-color: #e4ddf7;
  border-color: #e4ddf7;
}

.btn-pink-soft {
  color: #000;
  background-color: #f1ddec;
  border-color: #f1ddec;
}
.btn-pink-soft:hover {
  color: #000;
  background-color: #f3e2ef;
  border-color: #f2e0ee;
}
.btn-check:focus + .btn-pink-soft, .btn-pink-soft:focus {
  color: #000;
  background-color: #f3e2ef;
  border-color: #f2e0ee;
  box-shadow: 0 0 0 0.25rem rgba(205, 188, 201, 0.5);
}
.btn-check:checked + .btn-pink-soft, .btn-check:active + .btn-pink-soft, .btn-pink-soft:active, .btn-pink-soft.active, .show > .btn-pink-soft.dropdown-toggle {
  color: #000;
  background-color: #f4e4f0;
  border-color: #f2e0ee;
}
.btn-check:checked + .btn-pink-soft:focus, .btn-check:active + .btn-pink-soft:focus, .btn-pink-soft:active:focus, .btn-pink-soft.active:focus, .show > .btn-pink-soft.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(205, 188, 201, 0.5);
}
.btn-pink-soft:disabled, .btn-pink-soft.disabled {
  color: #000;
  background-color: #f1ddec;
  border-color: #f1ddec;
}

.btn-primary-soft {
  color: #000;
  background-color: #dae7fb;
  border-color: #dae7fb;
}
.btn-primary-soft:hover {
  color: #000;
  background-color: #e0ebfc;
  border-color: #dee9fb;
}
.btn-check:focus + .btn-primary-soft, .btn-primary-soft:focus {
  color: #000;
  background-color: #e0ebfc;
  border-color: #dee9fb;
  box-shadow: 0 0 0 0.25rem rgba(185, 196, 213, 0.5);
}
.btn-check:checked + .btn-primary-soft, .btn-check:active + .btn-primary-soft, .btn-primary-soft:active, .btn-primary-soft.active, .show > .btn-primary-soft.dropdown-toggle {
  color: #000;
  background-color: #e1ecfc;
  border-color: #dee9fb;
}
.btn-check:checked + .btn-primary-soft:focus, .btn-check:active + .btn-primary-soft:focus, .btn-primary-soft:active:focus, .btn-primary-soft.active:focus, .show > .btn-primary-soft.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(185, 196, 213, 0.5);
}
.btn-primary-soft:disabled, .btn-primary-soft.disabled {
  color: #000;
  background-color: #dae7fb;
  border-color: #dae7fb;
}

.btn-secondary-soft {
  color: #000;
  background-color: #e4ddf7;
  border-color: #e4ddf7;
}
.btn-secondary-soft:hover {
  color: #000;
  background-color: #e8e2f8;
  border-color: #e7e0f8;
}
.btn-check:focus + .btn-secondary-soft, .btn-secondary-soft:focus {
  color: #000;
  background-color: #e8e2f8;
  border-color: #e7e0f8;
  box-shadow: 0 0 0 0.25rem rgba(194, 188, 210, 0.5);
}
.btn-check:checked + .btn-secondary-soft, .btn-check:active + .btn-secondary-soft, .btn-secondary-soft:active, .btn-secondary-soft.active, .show > .btn-secondary-soft.dropdown-toggle {
  color: #000;
  background-color: #e9e4f9;
  border-color: #e7e0f8;
}
.btn-check:checked + .btn-secondary-soft:focus, .btn-check:active + .btn-secondary-soft:focus, .btn-secondary-soft:active:focus, .btn-secondary-soft.active:focus, .show > .btn-secondary-soft.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(194, 188, 210, 0.5);
}
.btn-secondary-soft:disabled, .btn-secondary-soft.disabled {
  color: #000;
  background-color: #e4ddf7;
  border-color: #e4ddf7;
}

.btn-success-soft {
  color: #000;
  background-color: #daefed;
  border-color: #daefed;
}
.btn-success-soft:hover {
  color: #000;
  background-color: #e0f1f0;
  border-color: #def1ef;
}
.btn-check:focus + .btn-success-soft, .btn-success-soft:focus {
  color: #000;
  background-color: #e0f1f0;
  border-color: #def1ef;
  box-shadow: 0 0 0 0.25rem rgba(185, 203, 201, 0.5);
}
.btn-check:checked + .btn-success-soft, .btn-check:active + .btn-success-soft, .btn-success-soft:active, .btn-success-soft.active, .show > .btn-success-soft.dropdown-toggle {
  color: #000;
  background-color: #e1f2f1;
  border-color: #def1ef;
}
.btn-check:checked + .btn-success-soft:focus, .btn-check:active + .btn-success-soft:focus, .btn-success-soft:active:focus, .btn-success-soft.active:focus, .show > .btn-success-soft.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(185, 203, 201, 0.5);
}
.btn-success-soft:disabled, .btn-success-soft.disabled {
  color: #000;
  background-color: #daefed;
  border-color: #daefed;
}

.btn-info-soft {
  color: #000;
  background-color: #daf2f8;
  border-color: #daf2f8;
}
.btn-info-soft:hover {
  color: #000;
  background-color: #e0f4f9;
  border-color: #def3f9;
}
.btn-check:focus + .btn-info-soft, .btn-info-soft:focus {
  color: #000;
  background-color: #e0f4f9;
  border-color: #def3f9;
  box-shadow: 0 0 0 0.25rem rgba(185, 206, 211, 0.5);
}
.btn-check:checked + .btn-info-soft, .btn-check:active + .btn-info-soft, .btn-info-soft:active, .btn-info-soft.active, .show > .btn-info-soft.dropdown-toggle {
  color: #000;
  background-color: #e1f5f9;
  border-color: #def3f9;
}
.btn-check:checked + .btn-info-soft:focus, .btn-check:active + .btn-info-soft:focus, .btn-info-soft:active:focus, .btn-info-soft.active:focus, .show > .btn-info-soft.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(185, 206, 211, 0.5);
}
.btn-info-soft:disabled, .btn-info-soft.disabled {
  color: #000;
  background-color: #daf2f8;
  border-color: #daf2f8;
}

.btn-warning-soft {
  color: #000;
  background-color: #f2eee3;
  border-color: #f2eee3;
}
.btn-warning-soft:hover {
  color: #000;
  background-color: #f4f1e7;
  border-color: #f3f0e6;
}
.btn-check:focus + .btn-warning-soft, .btn-warning-soft:focus {
  color: #000;
  background-color: #f4f1e7;
  border-color: #f3f0e6;
  box-shadow: 0 0 0 0.25rem rgba(206, 202, 193, 0.5);
}
.btn-check:checked + .btn-warning-soft, .btn-check:active + .btn-warning-soft, .btn-warning-soft:active, .btn-warning-soft.active, .show > .btn-warning-soft.dropdown-toggle {
  color: #000;
  background-color: #f5f1e9;
  border-color: #f3f0e6;
}
.btn-check:checked + .btn-warning-soft:focus, .btn-check:active + .btn-warning-soft:focus, .btn-warning-soft:active:focus, .btn-warning-soft.active:focus, .show > .btn-warning-soft.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(206, 202, 193, 0.5);
}
.btn-warning-soft:disabled, .btn-warning-soft.disabled {
  color: #000;
  background-color: #f2eee3;
  border-color: #f2eee3;
}

.btn-danger-soft {
  color: #000;
  background-color: #f1e0e3;
  border-color: #f1e0e3;
}
.btn-danger-soft:hover {
  color: #000;
  background-color: #f3e5e7;
  border-color: #f2e3e6;
}
.btn-check:focus + .btn-danger-soft, .btn-danger-soft:focus {
  color: #000;
  background-color: #f3e5e7;
  border-color: #f2e3e6;
  box-shadow: 0 0 0 0.25rem rgba(205, 190, 193, 0.5);
}
.btn-check:checked + .btn-danger-soft, .btn-check:active + .btn-danger-soft, .btn-danger-soft:active, .btn-danger-soft.active, .show > .btn-danger-soft.dropdown-toggle {
  color: #000;
  background-color: #f4e6e9;
  border-color: #f2e3e6;
}
.btn-check:checked + .btn-danger-soft:focus, .btn-check:active + .btn-danger-soft:focus, .btn-danger-soft:active:focus, .btn-danger-soft.active:focus, .show > .btn-danger-soft.dropdown-toggle:focus {
  box-shadow: 0 0 0 0.25rem rgba(205, 190, 193, 0.5);
}
.btn-danger-soft:disabled, .btn-danger-soft.disabled {
  color: #000;
  background-color: #f1e0e3;
  border-color: #f1e0e3;
}

.btn-outline-primary {
  color: #0061f2;
  border-color: #0061f2;
}
.btn-outline-primary:hover {
  color: #fff;
  background-color: #0061f2;
  border-color: #0061f2;
}
.btn-check:focus + .btn-outline-primary, .btn-outline-primary:focus {
  box-shadow: 0 0 0 0.25rem rgba(0, 97, 242, 0.5);
}
.btn-check:checked + .btn-outline-primary, .btn-check:active + .btn-outline-primary, .btn-outline-primary:active, .btn-outline-primary.active, .btn-outline-primary.dropdown-toggle.show {
  color: #fff;
  background-color: #0061f2;
  border-color: #0061f2;
}
.btn-check:checked + .btn-outline-primary:focus, .btn-check:active + .btn-outline-primary:focus, .btn-outline-primary:active:focus, .btn-outline-primary.active:focus, .btn-outline-primary.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(0, 97, 242, 0.5);
}
.btn-outline-primary:disabled, .btn-outline-primary.disabled {
  color: #0061f2;
  background-color: transparent;
}

.btn-outline-secondary {
  color: #6900c7;
  border-color: #6900c7;
}
.btn-outline-secondary:hover {
  color: #fff;
  background-color: #6900c7;
  border-color: #6900c7;
}
.btn-check:focus + .btn-outline-secondary, .btn-outline-secondary:focus {
  box-shadow: 0 0 0 0.25rem rgba(105, 0, 199, 0.5);
}
.btn-check:checked + .btn-outline-secondary, .btn-check:active + .btn-outline-secondary, .btn-outline-secondary:active, .btn-outline-secondary.active, .btn-outline-secondary.dropdown-toggle.show {
  color: #fff;
  background-color: #6900c7;
  border-color: #6900c7;
}
.btn-check:checked + .btn-outline-secondary:focus, .btn-check:active + .btn-outline-secondary:focus, .btn-outline-secondary:active:focus, .btn-outline-secondary.active:focus, .btn-outline-secondary.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(105, 0, 199, 0.5);
}
.btn-outline-secondary:disabled, .btn-outline-secondary.disabled {
  color: #6900c7;
  background-color: transparent;
}

.btn-outline-success {
  color: #00ac69;
  border-color: #00ac69;
}
.btn-outline-success:hover {
  color: #fff;
  background-color: #00ac69;
  border-color: #00ac69;
}
.btn-check:focus + .btn-outline-success, .btn-outline-success:focus {
  box-shadow: 0 0 0 0.25rem rgba(0, 172, 105, 0.5);
}
.btn-check:checked + .btn-outline-success, .btn-check:active + .btn-outline-success, .btn-outline-success:active, .btn-outline-success.active, .btn-outline-success.dropdown-toggle.show {
  color: #fff;
  background-color: #00ac69;
  border-color: #00ac69;
}
.btn-check:checked + .btn-outline-success:focus, .btn-check:active + .btn-outline-success:focus, .btn-outline-success:active:focus, .btn-outline-success.active:focus, .btn-outline-success.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(0, 172, 105, 0.5);
}
.btn-outline-success:disabled, .btn-outline-success.disabled {
  color: #00ac69;
  background-color: transparent;
}

.btn-outline-info {
  color: #00cfd5;
  border-color: #00cfd5;
}
.btn-outline-info:hover {
  color: #fff;
  background-color: #00cfd5;
  border-color: #00cfd5;
}
.btn-check:focus + .btn-outline-info, .btn-outline-info:focus {
  box-shadow: 0 0 0 0.25rem rgba(0, 207, 213, 0.5);
}
.btn-check:checked + .btn-outline-info, .btn-check:active + .btn-outline-info, .btn-outline-info:active, .btn-outline-info.active, .btn-outline-info.dropdown-toggle.show {
  color: #fff;
  background-color: #00cfd5;
  border-color: #00cfd5;
}
.btn-check:checked + .btn-outline-info:focus, .btn-check:active + .btn-outline-info:focus, .btn-outline-info:active:focus, .btn-outline-info.active:focus, .btn-outline-info.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(0, 207, 213, 0.5);
}
.btn-outline-info:disabled, .btn-outline-info.disabled {
  color: #00cfd5;
  background-color: transparent;
}

.btn-outline-warning {
  color: #f4a100;
  border-color: #f4a100;
}
.btn-outline-warning:hover {
  color: #fff;
  background-color: #f4a100;
  border-color: #f4a100;
}
.btn-check:focus + .btn-outline-warning, .btn-outline-warning:focus {
  box-shadow: 0 0 0 0.25rem rgba(244, 161, 0, 0.5);
}
.btn-check:checked + .btn-outline-warning, .btn-check:active + .btn-outline-warning, .btn-outline-warning:active, .btn-outline-warning.active, .btn-outline-warning.dropdown-toggle.show {
  color: #fff;
  background-color: #f4a100;
  border-color: #f4a100;
}
.btn-check:checked + .btn-outline-warning:focus, .btn-check:active + .btn-outline-warning:focus, .btn-outline-warning:active:focus, .btn-outline-warning.active:focus, .btn-outline-warning.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(244, 161, 0, 0.5);
}
.btn-outline-warning:disabled, .btn-outline-warning.disabled {
  color: #f4a100;
  background-color: transparent;
}

.btn-outline-danger {
  color: #e81500;
  border-color: #e81500;
}
.btn-outline-danger:hover {
  color: #fff;
  background-color: #e81500;
  border-color: #e81500;
}
.btn-check:focus + .btn-outline-danger, .btn-outline-danger:focus {
  box-shadow: 0 0 0 0.25rem rgba(232, 21, 0, 0.5);
}
.btn-check:checked + .btn-outline-danger, .btn-check:active + .btn-outline-danger, .btn-outline-danger:active, .btn-outline-danger.active, .btn-outline-danger.dropdown-toggle.show {
  color: #fff;
  background-color: #e81500;
  border-color: #e81500;
}
.btn-check:checked + .btn-outline-danger:focus, .btn-check:active + .btn-outline-danger:focus, .btn-outline-danger:active:focus, .btn-outline-danger.active:focus, .btn-outline-danger.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(232, 21, 0, 0.5);
}
.btn-outline-danger:disabled, .btn-outline-danger.disabled {
  color: #e81500;
  background-color: transparent;
}

.btn-outline-light {
  color: #f2f6fc;
  border-color: #f2f6fc;
}
.btn-outline-light:hover {
  color: #000;
  background-color: #f2f6fc;
  border-color: #f2f6fc;
}
.btn-check:focus + .btn-outline-light, .btn-outline-light:focus {
  box-shadow: 0 0 0 0.25rem rgba(242, 246, 252, 0.5);
}
.btn-check:checked + .btn-outline-light, .btn-check:active + .btn-outline-light, .btn-outline-light:active, .btn-outline-light.active, .btn-outline-light.dropdown-toggle.show {
  color: #000;
  background-color: #f2f6fc;
  border-color: #f2f6fc;
}
.btn-check:checked + .btn-outline-light:focus, .btn-check:active + .btn-outline-light:focus, .btn-outline-light:active:focus, .btn-outline-light.active:focus, .btn-outline-light.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(242, 246, 252, 0.5);
}
.btn-outline-light:disabled, .btn-outline-light.disabled {
  color: #f2f6fc;
  background-color: transparent;
}

.btn-outline-dark {
  color: #212832;
  border-color: #212832;
}
.btn-outline-dark:hover {
  color: #fff;
  background-color: #212832;
  border-color: #212832;
}
.btn-check:focus + .btn-outline-dark, .btn-outline-dark:focus {
  box-shadow: 0 0 0 0.25rem rgba(33, 40, 50, 0.5);
}
.btn-check:checked + .btn-outline-dark, .btn-check:active + .btn-outline-dark, .btn-outline-dark:active, .btn-outline-dark.active, .btn-outline-dark.dropdown-toggle.show {
  color: #fff;
  background-color: #212832;
  border-color: #212832;
}
.btn-check:checked + .btn-outline-dark:focus, .btn-check:active + .btn-outline-dark:focus, .btn-outline-dark:active:focus, .btn-outline-dark.active:focus, .btn-outline-dark.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(33, 40, 50, 0.5);
}
.btn-outline-dark:disabled, .btn-outline-dark.disabled {
  color: #212832;
  background-color: transparent;
}

.btn-outline-black {
  color: #000;
  border-color: #000;
}
.btn-outline-black:hover {
  color: #fff;
  background-color: #000;
  border-color: #000;
}
.btn-check:focus + .btn-outline-black, .btn-outline-black:focus {
  box-shadow: 0 0 0 0.25rem rgba(0, 0, 0, 0.5);
}
.btn-check:checked + .btn-outline-black, .btn-check:active + .btn-outline-black, .btn-outline-black:active, .btn-outline-black.active, .btn-outline-black.dropdown-toggle.show {
  color: #fff;
  background-color: #000;
  border-color: #000;
}
.btn-check:checked + .btn-outline-black:focus, .btn-check:active + .btn-outline-black:focus, .btn-outline-black:active:focus, .btn-outline-black.active:focus, .btn-outline-black.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(0, 0, 0, 0.5);
}
.btn-outline-black:disabled, .btn-outline-black.disabled {
  color: #000;
  background-color: transparent;
}

.btn-outline-white {
  color: #fff;
  border-color: #fff;
}
.btn-outline-white:hover {
  color: #000;
  background-color: #fff;
  border-color: #fff;
}
.btn-check:focus + .btn-outline-white, .btn-outline-white:focus {
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.5);
}
.btn-check:checked + .btn-outline-white, .btn-check:active + .btn-outline-white, .btn-outline-white:active, .btn-outline-white.active, .btn-outline-white.dropdown-toggle.show {
  color: #000;
  background-color: #fff;
  border-color: #fff;
}
.btn-check:checked + .btn-outline-white:focus, .btn-check:active + .btn-outline-white:focus, .btn-outline-white:active:focus, .btn-outline-white.active:focus, .btn-outline-white.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.5);
}
.btn-outline-white:disabled, .btn-outline-white.disabled {
  color: #fff;
  background-color: transparent;
}

.btn-outline-red {
  color: #e81500;
  border-color: #e81500;
}
.btn-outline-red:hover {
  color: #fff;
  background-color: #e81500;
  border-color: #e81500;
}
.btn-check:focus + .btn-outline-red, .btn-outline-red:focus {
  box-shadow: 0 0 0 0.25rem rgba(232, 21, 0, 0.5);
}
.btn-check:checked + .btn-outline-red, .btn-check:active + .btn-outline-red, .btn-outline-red:active, .btn-outline-red.active, .btn-outline-red.dropdown-toggle.show {
  color: #fff;
  background-color: #e81500;
  border-color: #e81500;
}
.btn-check:checked + .btn-outline-red:focus, .btn-check:active + .btn-outline-red:focus, .btn-outline-red:active:focus, .btn-outline-red.active:focus, .btn-outline-red.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(232, 21, 0, 0.5);
}
.btn-outline-red:disabled, .btn-outline-red.disabled {
  color: #e81500;
  background-color: transparent;
}

.btn-outline-orange {
  color: #f76400;
  border-color: #f76400;
}
.btn-outline-orange:hover {
  color: #fff;
  background-color: #f76400;
  border-color: #f76400;
}
.btn-check:focus + .btn-outline-orange, .btn-outline-orange:focus {
  box-shadow: 0 0 0 0.25rem rgba(247, 100, 0, 0.5);
}
.btn-check:checked + .btn-outline-orange, .btn-check:active + .btn-outline-orange, .btn-outline-orange:active, .btn-outline-orange.active, .btn-outline-orange.dropdown-toggle.show {
  color: #fff;
  background-color: #f76400;
  border-color: #f76400;
}
.btn-check:checked + .btn-outline-orange:focus, .btn-check:active + .btn-outline-orange:focus, .btn-outline-orange:active:focus, .btn-outline-orange.active:focus, .btn-outline-orange.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(247, 100, 0, 0.5);
}
.btn-outline-orange:disabled, .btn-outline-orange.disabled {
  color: #f76400;
  background-color: transparent;
}

.btn-outline-yellow {
  color: #f4a100;
  border-color: #f4a100;
}
.btn-outline-yellow:hover {
  color: #fff;
  background-color: #f4a100;
  border-color: #f4a100;
}
.btn-check:focus + .btn-outline-yellow, .btn-outline-yellow:focus {
  box-shadow: 0 0 0 0.25rem rgba(244, 161, 0, 0.5);
}
.btn-check:checked + .btn-outline-yellow, .btn-check:active + .btn-outline-yellow, .btn-outline-yellow:active, .btn-outline-yellow.active, .btn-outline-yellow.dropdown-toggle.show {
  color: #fff;
  background-color: #f4a100;
  border-color: #f4a100;
}
.btn-check:checked + .btn-outline-yellow:focus, .btn-check:active + .btn-outline-yellow:focus, .btn-outline-yellow:active:focus, .btn-outline-yellow.active:focus, .btn-outline-yellow.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(244, 161, 0, 0.5);
}
.btn-outline-yellow:disabled, .btn-outline-yellow.disabled {
  color: #f4a100;
  background-color: transparent;
}

.btn-outline-green {
  color: #00ac69;
  border-color: #00ac69;
}
.btn-outline-green:hover {
  color: #fff;
  background-color: #00ac69;
  border-color: #00ac69;
}
.btn-check:focus + .btn-outline-green, .btn-outline-green:focus {
  box-shadow: 0 0 0 0.25rem rgba(0, 172, 105, 0.5);
}
.btn-check:checked + .btn-outline-green, .btn-check:active + .btn-outline-green, .btn-outline-green:active, .btn-outline-green.active, .btn-outline-green.dropdown-toggle.show {
  color: #fff;
  background-color: #00ac69;
  border-color: #00ac69;
}
.btn-check:checked + .btn-outline-green:focus, .btn-check:active + .btn-outline-green:focus, .btn-outline-green:active:focus, .btn-outline-green.active:focus, .btn-outline-green.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(0, 172, 105, 0.5);
}
.btn-outline-green:disabled, .btn-outline-green.disabled {
  color: #00ac69;
  background-color: transparent;
}

.btn-outline-teal {
  color: #00ba94;
  border-color: #00ba94;
}
.btn-outline-teal:hover {
  color: #fff;
  background-color: #00ba94;
  border-color: #00ba94;
}
.btn-check:focus + .btn-outline-teal, .btn-outline-teal:focus {
  box-shadow: 0 0 0 0.25rem rgba(0, 186, 148, 0.5);
}
.btn-check:checked + .btn-outline-teal, .btn-check:active + .btn-outline-teal, .btn-outline-teal:active, .btn-outline-teal.active, .btn-outline-teal.dropdown-toggle.show {
  color: #fff;
  background-color: #00ba94;
  border-color: #00ba94;
}
.btn-check:checked + .btn-outline-teal:focus, .btn-check:active + .btn-outline-teal:focus, .btn-outline-teal:active:focus, .btn-outline-teal.active:focus, .btn-outline-teal.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(0, 186, 148, 0.5);
}
.btn-outline-teal:disabled, .btn-outline-teal.disabled {
  color: #00ba94;
  background-color: transparent;
}

.btn-outline-cyan {
  color: #00cfd5;
  border-color: #00cfd5;
}
.btn-outline-cyan:hover {
  color: #fff;
  background-color: #00cfd5;
  border-color: #00cfd5;
}
.btn-check:focus + .btn-outline-cyan, .btn-outline-cyan:focus {
  box-shadow: 0 0 0 0.25rem rgba(0, 207, 213, 0.5);
}
.btn-check:checked + .btn-outline-cyan, .btn-check:active + .btn-outline-cyan, .btn-outline-cyan:active, .btn-outline-cyan.active, .btn-outline-cyan.dropdown-toggle.show {
  color: #fff;
  background-color: #00cfd5;
  border-color: #00cfd5;
}
.btn-check:checked + .btn-outline-cyan:focus, .btn-check:active + .btn-outline-cyan:focus, .btn-outline-cyan:active:focus, .btn-outline-cyan.active:focus, .btn-outline-cyan.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(0, 207, 213, 0.5);
}
.btn-outline-cyan:disabled, .btn-outline-cyan.disabled {
  color: #00cfd5;
  background-color: transparent;
}

.btn-outline-blue {
  color: #0061f2;
  border-color: #0061f2;
}
.btn-outline-blue:hover {
  color: #fff;
  background-color: #0061f2;
  border-color: #0061f2;
}
.btn-check:focus + .btn-outline-blue, .btn-outline-blue:focus {
  box-shadow: 0 0 0 0.25rem rgba(0, 97, 242, 0.5);
}
.btn-check:checked + .btn-outline-blue, .btn-check:active + .btn-outline-blue, .btn-outline-blue:active, .btn-outline-blue.active, .btn-outline-blue.dropdown-toggle.show {
  color: #fff;
  background-color: #0061f2;
  border-color: #0061f2;
}
.btn-check:checked + .btn-outline-blue:focus, .btn-check:active + .btn-outline-blue:focus, .btn-outline-blue:active:focus, .btn-outline-blue.active:focus, .btn-outline-blue.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(0, 97, 242, 0.5);
}
.btn-outline-blue:disabled, .btn-outline-blue.disabled {
  color: #0061f2;
  background-color: transparent;
}

.btn-outline-indigo {
  color: #5800e8;
  border-color: #5800e8;
}
.btn-outline-indigo:hover {
  color: #fff;
  background-color: #5800e8;
  border-color: #5800e8;
}
.btn-check:focus + .btn-outline-indigo, .btn-outline-indigo:focus {
  box-shadow: 0 0 0 0.25rem rgba(88, 0, 232, 0.5);
}
.btn-check:checked + .btn-outline-indigo, .btn-check:active + .btn-outline-indigo, .btn-outline-indigo:active, .btn-outline-indigo.active, .btn-outline-indigo.dropdown-toggle.show {
  color: #fff;
  background-color: #5800e8;
  border-color: #5800e8;
}
.btn-check:checked + .btn-outline-indigo:focus, .btn-check:active + .btn-outline-indigo:focus, .btn-outline-indigo:active:focus, .btn-outline-indigo.active:focus, .btn-outline-indigo.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(88, 0, 232, 0.5);
}
.btn-outline-indigo:disabled, .btn-outline-indigo.disabled {
  color: #5800e8;
  background-color: transparent;
}

.btn-outline-purple {
  color: #6900c7;
  border-color: #6900c7;
}
.btn-outline-purple:hover {
  color: #fff;
  background-color: #6900c7;
  border-color: #6900c7;
}
.btn-check:focus + .btn-outline-purple, .btn-outline-purple:focus {
  box-shadow: 0 0 0 0.25rem rgba(105, 0, 199, 0.5);
}
.btn-check:checked + .btn-outline-purple, .btn-check:active + .btn-outline-purple, .btn-outline-purple:active, .btn-outline-purple.active, .btn-outline-purple.dropdown-toggle.show {
  color: #fff;
  background-color: #6900c7;
  border-color: #6900c7;
}
.btn-check:checked + .btn-outline-purple:focus, .btn-check:active + .btn-outline-purple:focus, .btn-outline-purple:active:focus, .btn-outline-purple.active:focus, .btn-outline-purple.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(105, 0, 199, 0.5);
}
.btn-outline-purple:disabled, .btn-outline-purple.disabled {
  color: #6900c7;
  background-color: transparent;
}

.btn-outline-pink {
  color: #e30059;
  border-color: #e30059;
}
.btn-outline-pink:hover {
  color: #fff;
  background-color: #e30059;
  border-color: #e30059;
}
.btn-check:focus + .btn-outline-pink, .btn-outline-pink:focus {
  box-shadow: 0 0 0 0.25rem rgba(227, 0, 89, 0.5);
}
.btn-check:checked + .btn-outline-pink, .btn-check:active + .btn-outline-pink, .btn-outline-pink:active, .btn-outline-pink.active, .btn-outline-pink.dropdown-toggle.show {
  color: #fff;
  background-color: #e30059;
  border-color: #e30059;
}
.btn-check:checked + .btn-outline-pink:focus, .btn-check:active + .btn-outline-pink:focus, .btn-outline-pink:active:focus, .btn-outline-pink.active:focus, .btn-outline-pink.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(227, 0, 89, 0.5);
}
.btn-outline-pink:disabled, .btn-outline-pink.disabled {
  color: #e30059;
  background-color: transparent;
}

.btn-outline-red-soft {
  color: #f1e0e3;
  border-color: #f1e0e3;
}
.btn-outline-red-soft:hover {
  color: #000;
  background-color: #f1e0e3;
  border-color: #f1e0e3;
}
.btn-check:focus + .btn-outline-red-soft, .btn-outline-red-soft:focus {
  box-shadow: 0 0 0 0.25rem rgba(241, 224, 227, 0.5);
}
.btn-check:checked + .btn-outline-red-soft, .btn-check:active + .btn-outline-red-soft, .btn-outline-red-soft:active, .btn-outline-red-soft.active, .btn-outline-red-soft.dropdown-toggle.show {
  color: #000;
  background-color: #f1e0e3;
  border-color: #f1e0e3;
}
.btn-check:checked + .btn-outline-red-soft:focus, .btn-check:active + .btn-outline-red-soft:focus, .btn-outline-red-soft:active:focus, .btn-outline-red-soft.active:focus, .btn-outline-red-soft.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(241, 224, 227, 0.5);
}
.btn-outline-red-soft:disabled, .btn-outline-red-soft.disabled {
  color: #f1e0e3;
  background-color: transparent;
}

.btn-outline-orange-soft {
  color: #f3e7e3;
  border-color: #f3e7e3;
}
.btn-outline-orange-soft:hover {
  color: #000;
  background-color: #f3e7e3;
  border-color: #f3e7e3;
}
.btn-check:focus + .btn-outline-orange-soft, .btn-outline-orange-soft:focus {
  box-shadow: 0 0 0 0.25rem rgba(243, 231, 227, 0.5);
}
.btn-check:checked + .btn-outline-orange-soft, .btn-check:active + .btn-outline-orange-soft, .btn-outline-orange-soft:active, .btn-outline-orange-soft.active, .btn-outline-orange-soft.dropdown-toggle.show {
  color: #000;
  background-color: #f3e7e3;
  border-color: #f3e7e3;
}
.btn-check:checked + .btn-outline-orange-soft:focus, .btn-check:active + .btn-outline-orange-soft:focus, .btn-outline-orange-soft:active:focus, .btn-outline-orange-soft.active:focus, .btn-outline-orange-soft.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(243, 231, 227, 0.5);
}
.btn-outline-orange-soft:disabled, .btn-outline-orange-soft.disabled {
  color: #f3e7e3;
  background-color: transparent;
}

.btn-outline-yellow-soft {
  color: #f2eee3;
  border-color: #f2eee3;
}
.btn-outline-yellow-soft:hover {
  color: #000;
  background-color: #f2eee3;
  border-color: #f2eee3;
}
.btn-check:focus + .btn-outline-yellow-soft, .btn-outline-yellow-soft:focus {
  box-shadow: 0 0 0 0.25rem rgba(242, 238, 227, 0.5);
}
.btn-check:checked + .btn-outline-yellow-soft, .btn-check:active + .btn-outline-yellow-soft, .btn-outline-yellow-soft:active, .btn-outline-yellow-soft.active, .btn-outline-yellow-soft.dropdown-toggle.show {
  color: #000;
  background-color: #f2eee3;
  border-color: #f2eee3;
}
.btn-check:checked + .btn-outline-yellow-soft:focus, .btn-check:active + .btn-outline-yellow-soft:focus, .btn-outline-yellow-soft:active:focus, .btn-outline-yellow-soft.active:focus, .btn-outline-yellow-soft.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(242, 238, 227, 0.5);
}
.btn-outline-yellow-soft:disabled, .btn-outline-yellow-soft.disabled {
  color: #f2eee3;
  background-color: transparent;
}

.btn-outline-green-soft {
  color: #daefed;
  border-color: #daefed;
}
.btn-outline-green-soft:hover {
  color: #000;
  background-color: #daefed;
  border-color: #daefed;
}
.btn-check:focus + .btn-outline-green-soft, .btn-outline-green-soft:focus {
  box-shadow: 0 0 0 0.25rem rgba(218, 239, 237, 0.5);
}
.btn-check:checked + .btn-outline-green-soft, .btn-check:active + .btn-outline-green-soft, .btn-outline-green-soft:active, .btn-outline-green-soft.active, .btn-outline-green-soft.dropdown-toggle.show {
  color: #000;
  background-color: #daefed;
  border-color: #daefed;
}
.btn-check:checked + .btn-outline-green-soft:focus, .btn-check:active + .btn-outline-green-soft:focus, .btn-outline-green-soft:active:focus, .btn-outline-green-soft.active:focus, .btn-outline-green-soft.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(218, 239, 237, 0.5);
}
.btn-outline-green-soft:disabled, .btn-outline-green-soft.disabled {
  color: #daefed;
  background-color: transparent;
}

.btn-outline-teal-soft {
  color: #daf0f2;
  border-color: #daf0f2;
}
.btn-outline-teal-soft:hover {
  color: #000;
  background-color: #daf0f2;
  border-color: #daf0f2;
}
.btn-check:focus + .btn-outline-teal-soft, .btn-outline-teal-soft:focus {
  box-shadow: 0 0 0 0.25rem rgba(218, 240, 242, 0.5);
}
.btn-check:checked + .btn-outline-teal-soft, .btn-check:active + .btn-outline-teal-soft, .btn-outline-teal-soft:active, .btn-outline-teal-soft.active, .btn-outline-teal-soft.dropdown-toggle.show {
  color: #000;
  background-color: #daf0f2;
  border-color: #daf0f2;
}
.btn-check:checked + .btn-outline-teal-soft:focus, .btn-check:active + .btn-outline-teal-soft:focus, .btn-outline-teal-soft:active:focus, .btn-outline-teal-soft.active:focus, .btn-outline-teal-soft.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(218, 240, 242, 0.5);
}
.btn-outline-teal-soft:disabled, .btn-outline-teal-soft.disabled {
  color: #daf0f2;
  background-color: transparent;
}

.btn-outline-cyan-soft {
  color: #daf2f8;
  border-color: #daf2f8;
}
.btn-outline-cyan-soft:hover {
  color: #000;
  background-color: #daf2f8;
  border-color: #daf2f8;
}
.btn-check:focus + .btn-outline-cyan-soft, .btn-outline-cyan-soft:focus {
  box-shadow: 0 0 0 0.25rem rgba(218, 242, 248, 0.5);
}
.btn-check:checked + .btn-outline-cyan-soft, .btn-check:active + .btn-outline-cyan-soft, .btn-outline-cyan-soft:active, .btn-outline-cyan-soft.active, .btn-outline-cyan-soft.dropdown-toggle.show {
  color: #000;
  background-color: #daf2f8;
  border-color: #daf2f8;
}
.btn-check:checked + .btn-outline-cyan-soft:focus, .btn-check:active + .btn-outline-cyan-soft:focus, .btn-outline-cyan-soft:active:focus, .btn-outline-cyan-soft.active:focus, .btn-outline-cyan-soft.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(218, 242, 248, 0.5);
}
.btn-outline-cyan-soft:disabled, .btn-outline-cyan-soft.disabled {
  color: #daf2f8;
  background-color: transparent;
}

.btn-outline-blue-soft {
  color: #dae7fb;
  border-color: #dae7fb;
}
.btn-outline-blue-soft:hover {
  color: #000;
  background-color: #dae7fb;
  border-color: #dae7fb;
}
.btn-check:focus + .btn-outline-blue-soft, .btn-outline-blue-soft:focus {
  box-shadow: 0 0 0 0.25rem rgba(218, 231, 251, 0.5);
}
.btn-check:checked + .btn-outline-blue-soft, .btn-check:active + .btn-outline-blue-soft, .btn-outline-blue-soft:active, .btn-outline-blue-soft.active, .btn-outline-blue-soft.dropdown-toggle.show {
  color: #000;
  background-color: #dae7fb;
  border-color: #dae7fb;
}
.btn-check:checked + .btn-outline-blue-soft:focus, .btn-check:active + .btn-outline-blue-soft:focus, .btn-outline-blue-soft:active:focus, .btn-outline-blue-soft.active:focus, .btn-outline-blue-soft.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(218, 231, 251, 0.5);
}
.btn-outline-blue-soft:disabled, .btn-outline-blue-soft.disabled {
  color: #dae7fb;
  background-color: transparent;
}

.btn-outline-indigo-soft {
  color: #e3ddfa;
  border-color: #e3ddfa;
}
.btn-outline-indigo-soft:hover {
  color: #000;
  background-color: #e3ddfa;
  border-color: #e3ddfa;
}
.btn-check:focus + .btn-outline-indigo-soft, .btn-outline-indigo-soft:focus {
  box-shadow: 0 0 0 0.25rem rgba(227, 221, 250, 0.5);
}
.btn-check:checked + .btn-outline-indigo-soft, .btn-check:active + .btn-outline-indigo-soft, .btn-outline-indigo-soft:active, .btn-outline-indigo-soft.active, .btn-outline-indigo-soft.dropdown-toggle.show {
  color: #000;
  background-color: #e3ddfa;
  border-color: #e3ddfa;
}
.btn-check:checked + .btn-outline-indigo-soft:focus, .btn-check:active + .btn-outline-indigo-soft:focus, .btn-outline-indigo-soft:active:focus, .btn-outline-indigo-soft.active:focus, .btn-outline-indigo-soft.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(227, 221, 250, 0.5);
}
.btn-outline-indigo-soft:disabled, .btn-outline-indigo-soft.disabled {
  color: #e3ddfa;
  background-color: transparent;
}

.btn-outline-purple-soft {
  color: #e4ddf7;
  border-color: #e4ddf7;
}
.btn-outline-purple-soft:hover {
  color: #000;
  background-color: #e4ddf7;
  border-color: #e4ddf7;
}
.btn-check:focus + .btn-outline-purple-soft, .btn-outline-purple-soft:focus {
  box-shadow: 0 0 0 0.25rem rgba(228, 221, 247, 0.5);
}
.btn-check:checked + .btn-outline-purple-soft, .btn-check:active + .btn-outline-purple-soft, .btn-outline-purple-soft:active, .btn-outline-purple-soft.active, .btn-outline-purple-soft.dropdown-toggle.show {
  color: #000;
  background-color: #e4ddf7;
  border-color: #e4ddf7;
}
.btn-check:checked + .btn-outline-purple-soft:focus, .btn-check:active + .btn-outline-purple-soft:focus, .btn-outline-purple-soft:active:focus, .btn-outline-purple-soft.active:focus, .btn-outline-purple-soft.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(228, 221, 247, 0.5);
}
.btn-outline-purple-soft:disabled, .btn-outline-purple-soft.disabled {
  color: #e4ddf7;
  background-color: transparent;
}

.btn-outline-pink-soft {
  color: #f1ddec;
  border-color: #f1ddec;
}
.btn-outline-pink-soft:hover {
  color: #000;
  background-color: #f1ddec;
  border-color: #f1ddec;
}
.btn-check:focus + .btn-outline-pink-soft, .btn-outline-pink-soft:focus {
  box-shadow: 0 0 0 0.25rem rgba(241, 221, 236, 0.5);
}
.btn-check:checked + .btn-outline-pink-soft, .btn-check:active + .btn-outline-pink-soft, .btn-outline-pink-soft:active, .btn-outline-pink-soft.active, .btn-outline-pink-soft.dropdown-toggle.show {
  color: #000;
  background-color: #f1ddec;
  border-color: #f1ddec;
}
.btn-check:checked + .btn-outline-pink-soft:focus, .btn-check:active + .btn-outline-pink-soft:focus, .btn-outline-pink-soft:active:focus, .btn-outline-pink-soft.active:focus, .btn-outline-pink-soft.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(241, 221, 236, 0.5);
}
.btn-outline-pink-soft:disabled, .btn-outline-pink-soft.disabled {
  color: #f1ddec;
  background-color: transparent;
}

.btn-outline-primary-soft {
  color: #dae7fb;
  border-color: #dae7fb;
}
.btn-outline-primary-soft:hover {
  color: #000;
  background-color: #dae7fb;
  border-color: #dae7fb;
}
.btn-check:focus + .btn-outline-primary-soft, .btn-outline-primary-soft:focus {
  box-shadow: 0 0 0 0.25rem rgba(218, 231, 251, 0.5);
}
.btn-check:checked + .btn-outline-primary-soft, .btn-check:active + .btn-outline-primary-soft, .btn-outline-primary-soft:active, .btn-outline-primary-soft.active, .btn-outline-primary-soft.dropdown-toggle.show {
  color: #000;
  background-color: #dae7fb;
  border-color: #dae7fb;
}
.btn-check:checked + .btn-outline-primary-soft:focus, .btn-check:active + .btn-outline-primary-soft:focus, .btn-outline-primary-soft:active:focus, .btn-outline-primary-soft.active:focus, .btn-outline-primary-soft.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(218, 231, 251, 0.5);
}
.btn-outline-primary-soft:disabled, .btn-outline-primary-soft.disabled {
  color: #dae7fb;
  background-color: transparent;
}

.btn-outline-secondary-soft {
  color: #e4ddf7;
  border-color: #e4ddf7;
}
.btn-outline-secondary-soft:hover {
  color: #000;
  background-color: #e4ddf7;
  border-color: #e4ddf7;
}
.btn-check:focus + .btn-outline-secondary-soft, .btn-outline-secondary-soft:focus {
  box-shadow: 0 0 0 0.25rem rgba(228, 221, 247, 0.5);
}
.btn-check:checked + .btn-outline-secondary-soft, .btn-check:active + .btn-outline-secondary-soft, .btn-outline-secondary-soft:active, .btn-outline-secondary-soft.active, .btn-outline-secondary-soft.dropdown-toggle.show {
  color: #000;
  background-color: #e4ddf7;
  border-color: #e4ddf7;
}
.btn-check:checked + .btn-outline-secondary-soft:focus, .btn-check:active + .btn-outline-secondary-soft:focus, .btn-outline-secondary-soft:active:focus, .btn-outline-secondary-soft.active:focus, .btn-outline-secondary-soft.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(228, 221, 247, 0.5);
}
.btn-outline-secondary-soft:disabled, .btn-outline-secondary-soft.disabled {
  color: #e4ddf7;
  background-color: transparent;
}

.btn-outline-success-soft {
  color: #daefed;
  border-color: #daefed;
}
.btn-outline-success-soft:hover {
  color: #000;
  background-color: #daefed;
  border-color: #daefed;
}
.btn-check:focus + .btn-outline-success-soft, .btn-outline-success-soft:focus {
  box-shadow: 0 0 0 0.25rem rgba(218, 239, 237, 0.5);
}
.btn-check:checked + .btn-outline-success-soft, .btn-check:active + .btn-outline-success-soft, .btn-outline-success-soft:active, .btn-outline-success-soft.active, .btn-outline-success-soft.dropdown-toggle.show {
  color: #000;
  background-color: #daefed;
  border-color: #daefed;
}
.btn-check:checked + .btn-outline-success-soft:focus, .btn-check:active + .btn-outline-success-soft:focus, .btn-outline-success-soft:active:focus, .btn-outline-success-soft.active:focus, .btn-outline-success-soft.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(218, 239, 237, 0.5);
}
.btn-outline-success-soft:disabled, .btn-outline-success-soft.disabled {
  color: #daefed;
  background-color: transparent;
}

.btn-outline-info-soft {
  color: #daf2f8;
  border-color: #daf2f8;
}
.btn-outline-info-soft:hover {
  color: #000;
  background-color: #daf2f8;
  border-color: #daf2f8;
}
.btn-check:focus + .btn-outline-info-soft, .btn-outline-info-soft:focus {
  box-shadow: 0 0 0 0.25rem rgba(218, 242, 248, 0.5);
}
.btn-check:checked + .btn-outline-info-soft, .btn-check:active + .btn-outline-info-soft, .btn-outline-info-soft:active, .btn-outline-info-soft.active, .btn-outline-info-soft.dropdown-toggle.show {
  color: #000;
  background-color: #daf2f8;
  border-color: #daf2f8;
}
.btn-check:checked + .btn-outline-info-soft:focus, .btn-check:active + .btn-outline-info-soft:focus, .btn-outline-info-soft:active:focus, .btn-outline-info-soft.active:focus, .btn-outline-info-soft.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(218, 242, 248, 0.5);
}
.btn-outline-info-soft:disabled, .btn-outline-info-soft.disabled {
  color: #daf2f8;
  background-color: transparent;
}

.btn-outline-warning-soft {
  color: #f2eee3;
  border-color: #f2eee3;
}
.btn-outline-warning-soft:hover {
  color: #000;
  background-color: #f2eee3;
  border-color: #f2eee3;
}
.btn-check:focus + .btn-outline-warning-soft, .btn-outline-warning-soft:focus {
  box-shadow: 0 0 0 0.25rem rgba(242, 238, 227, 0.5);
}
.btn-check:checked + .btn-outline-warning-soft, .btn-check:active + .btn-outline-warning-soft, .btn-outline-warning-soft:active, .btn-outline-warning-soft.active, .btn-outline-warning-soft.dropdown-toggle.show {
  color: #000;
  background-color: #f2eee3;
  border-color: #f2eee3;
}
.btn-check:checked + .btn-outline-warning-soft:focus, .btn-check:active + .btn-outline-warning-soft:focus, .btn-outline-warning-soft:active:focus, .btn-outline-warning-soft.active:focus, .btn-outline-warning-soft.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(242, 238, 227, 0.5);
}
.btn-outline-warning-soft:disabled, .btn-outline-warning-soft.disabled {
  color: #f2eee3;
  background-color: transparent;
}

.btn-outline-danger-soft {
  color: #f1e0e3;
  border-color: #f1e0e3;
}
.btn-outline-danger-soft:hover {
  color: #000;
  background-color: #f1e0e3;
  border-color: #f1e0e3;
}
.btn-check:focus + .btn-outline-danger-soft, .btn-outline-danger-soft:focus {
  box-shadow: 0 0 0 0.25rem rgba(241, 224, 227, 0.5);
}
.btn-check:checked + .btn-outline-danger-soft, .btn-check:active + .btn-outline-danger-soft, .btn-outline-danger-soft:active, .btn-outline-danger-soft.active, .btn-outline-danger-soft.dropdown-toggle.show {
  color: #000;
  background-color: #f1e0e3;
  border-color: #f1e0e3;
}
.btn-check:checked + .btn-outline-danger-soft:focus, .btn-check:active + .btn-outline-danger-soft:focus, .btn-outline-danger-soft:active:focus, .btn-outline-danger-soft.active:focus, .btn-outline-danger-soft.dropdown-toggle.show:focus {
  box-shadow: 0 0 0 0.25rem rgba(241, 224, 227, 0.5);
}
.btn-outline-danger-soft:disabled, .btn-outline-danger-soft.disabled {
  color: #f1e0e3;
  background-color: transparent;
}

.btn-link {
  font-weight: 400;
  color: #0061f2;
  text-decoration: none;
}
.btn-link:hover {
  color: #004ec2;
  text-decoration: underline;
}
.btn-link:focus {
  text-decoration: underline;
}
.btn-link:disabled, .btn-link.disabled {
  color: #69707a;
}

.btn-lg, .btn-group-lg > .btn {
  padding: 1.125rem 1.5rem;
  font-size: 1rem;
  border-radius: 0.5rem;
}

.btn-sm, .btn-group-sm > .btn {
  padding: 0.5rem 0.75rem;
  font-size: 0.75rem;
  border-radius: 0.25rem;
}

.float-start {
  display: block;
  margin-left: 0;
  margin-right: auto;
}

.float-end {
  display: block;
  margin-left: auto;
  margin-right: 0;
}

.float-center {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.pull-right {
  float: right
}

.pull-left {
  float: left
}

.position-static {
  position: static !important;
}

.position-relative {
  position: relative !important;
}

.position-absolute {
  position: absolute !important;
}

.position-fixed {
  position: fixed !important;
}

.position-sticky {
  position: -webkit-sticky !important;
  position: sticky !important;
}

.top-0 {
  top: 0 !important;
}

.top-50 {
  top: 50% !important;
}

.top-100 {
  top: 100% !important;
}

.bottom-0 {
  bottom: 0 !important;
}

.bottom-50 {
  bottom: 50% !important;
}

.bottom-100 {
  bottom: 100% !important;
}

.start-0 {
  left: 0 !important;
}

.start-50 {
  left: 50% !important;
}

.start-100 {
  left: 100% !important;
}

.end-0 {
  right: 0 !important;
}

.end-50 {
  right: 50% !important;
}

.end-100 {
  right: 100% !important;
}
.m-0 {
  margin: 0 !important;
}

.m-1 {
  margin: 0.25rem !important;
}

.m-2 {
  margin: 0.5rem !important;
}

.m-3 {
  margin: 1rem !important;
}

.m-4 {
  margin: 1.5rem !important;
}

.m-5 {
  margin: 2.5rem !important;
}

.m-10 {
  margin: 6rem !important;
}

.m-15 {
  margin: 9rem !important;
}

.m-auto {
  margin: auto !important;
}

.mx-0 {
  margin-right: 0 !important;
  margin-left: 0 !important;
}

.mx-1 {
  margin-right: 0.25rem !important;
  margin-left: 0.25rem !important;
}

.mx-2 {
  margin-right: 0.5rem !important;
  margin-left: 0.5rem !important;
}

.mx-3 {
  margin-right: 1rem !important;
  margin-left: 1rem !important;
}

.mx-4 {
  margin-right: 1.5rem !important;
  margin-left: 1.5rem !important;
}

.mx-5 {
  margin-right: 2.5rem !important;
  margin-left: 2.5rem !important;
}

.mx-10 {
  margin-right: 6rem !important;
  margin-left: 6rem !important;
}

.mx-15 {
  margin-right: 9rem !important;
  margin-left: 9rem !important;
}

.mx-auto {
  margin-right: auto !important;
  margin-left: auto !important;
}

.my-0 {
  margin-top: 0 !important;
  margin-bottom: 0 !important;
}

.my-1 {
  margin-top: 0.25rem !important;
  margin-bottom: 0.25rem !important;
}

.my-2 {
  margin-top: 0.5rem !important;
  margin-bottom: 0.5rem !important;
}

.my-3 {
  margin-top: 1rem !important;
  margin-bottom: 1rem !important;
}

.my-4 {
  margin-top: 1.5rem !important;
  margin-bottom: 1.5rem !important;
}

.my-5 {
  margin-top: 2.5rem !important;
  margin-bottom: 2.5rem !important;
}

.my-10 {
  margin-top: 6rem !important;
  margin-bottom: 6rem !important;
}

.my-15 {
  margin-top: 9rem !important;
  margin-bottom: 9rem !important;
}

.my-auto {
  margin-top: auto !important;
  margin-bottom: auto !important;
}

.mt-0 {
  margin-top: 0 !important;
}

.mt-1 {
  margin-top: 0.25rem !important;
}

.mt-2 {
  margin-top: 0.5rem !important;
}

.mt-3 {
  margin-top: 1rem !important;
}

.mt-4 {
  margin-top: 1.5rem !important;
}

.mt-5 {
  margin-top: 2.5rem !important;
}

.mt-10 {
  margin-top: 6rem !important;
}

.mt-15 {
  margin-top: 9rem !important;
}

.mt-auto {
  margin-top: auto !important;
}

.me-0 {
  margin-right: 0 !important;
}

.me-1 {
  margin-right: 0.25rem !important;
}

.me-2 {
  margin-right: 0.5rem !important;
}

.me-3 {
  margin-right: 1rem !important;
}

.me-4 {
  margin-right: 1.5rem !important;
}

.me-5 {
  margin-right: 2.5rem !important;
}

.me-10 {
  margin-right: 6rem !important;
}

.me-15 {
  margin-right: 9rem !important;
}

.me-auto {
  margin-right: auto !important;
}

.mb-0 {
  margin-bottom: 0 !important;
}

.mb-1 {
  margin-bottom: 0.25rem !important;
}

.mb-2 {
  margin-bottom: 0.5rem !important;
}

.mb-3 {
  margin-bottom: 1rem !important;
}

.mb-4 {
  margin-bottom: 1.5rem !important;
}

.mb-5 {
  margin-bottom: 2.5rem !important;
}

.mb-10 {
  margin-bottom: 6rem !important;
}

.mb-15 {
  margin-bottom: 9rem !important;
}

.mb-auto {
  margin-bottom: auto !important;
}

.ms-0 {
  margin-left: 0 !important;
}

.ms-1 {
  margin-left: 0.25rem !important;
}

.ms-2 {
  margin-left: 0.5rem !important;
}

.ms-3 {
  margin-left: 1rem !important;
}

.ms-4 {
  margin-left: 1.5rem !important;
}

.ms-5 {
  margin-left: 2.5rem !important;
}

.ms-10 {
  margin-left: 6rem !important;
}

.ms-15 {
  margin-left: 9rem !important;
}

.ms-auto {
  margin-left: auto !important;
}

.m-n1 {
  margin: -0.25rem !important;
}

.m-n2 {
  margin: -0.5rem !important;
}

.m-n3 {
  margin: -1rem !important;
}

.m-n4 {
  margin: -1.5rem !important;
}

.m-n5 {
  margin: -2.5rem !important;
}

.m-n10 {
  margin: -6rem !important;
}

.m-n15 {
  margin: -9rem !important;
}

.mx-n1 {
  margin-right: -0.25rem !important;
  margin-left: -0.25rem !important;
}

.mx-n2 {
  margin-right: -0.5rem !important;
  margin-left: -0.5rem !important;
}

.mx-n3 {
  margin-right: -1rem !important;
  margin-left: -1rem !important;
}

.mx-n4 {
  margin-right: -1.5rem !important;
  margin-left: -1.5rem !important;
}

.mx-n5 {
  margin-right: -2.5rem !important;
  margin-left: -2.5rem !important;
}

.mx-n10 {
  margin-right: -6rem !important;
  margin-left: -6rem !important;
}

.mx-n15 {
  margin-right: -9rem !important;
  margin-left: -9rem !important;
}

.my-n1 {
  margin-top: -0.25rem !important;
  margin-bottom: -0.25rem !important;
}

.my-n2 {
  margin-top: -0.5rem !important;
  margin-bottom: -0.5rem !important;
}

.my-n3 {
  margin-top: -1rem !important;
  margin-bottom: -1rem !important;
}

.my-n4 {
  margin-top: -1.5rem !important;
  margin-bottom: -1.5rem !important;
}

.my-n5 {
  margin-top: -2.5rem !important;
  margin-bottom: -2.5rem !important;
}

.my-n10 {
  margin-top: -6rem !important;
  margin-bottom: -6rem !important;
}

.my-n15 {
  margin-top: -9rem !important;
  margin-bottom: -9rem !important;
}

.mt-n1 {
  margin-top: -0.25rem !important;
}

.mt-n2 {
  margin-top: -0.5rem !important;
}

.mt-n3 {
  margin-top: -1rem !important;
}

.mt-n4 {
  margin-top: -1.5rem !important;
}

.mt-n5 {
  margin-top: -2.5rem !important;
}

.mt-n10 {
  margin-top: -6rem !important;
}

.mt-n15 {
  margin-top: -9rem !important;
}

.me-n1 {
  margin-right: -0.25rem !important;
}

.me-n2 {
  margin-right: -0.5rem !important;
}

.me-n3 {
  margin-right: -1rem !important;
}

.me-n4 {
  margin-right: -1.5rem !important;
}

.me-n5 {
  margin-right: -2.5rem !important;
}

.me-n10 {
  margin-right: -6rem !important;
}

.me-n15 {
  margin-right: -9rem !important;
}

.mb-n1 {
  margin-bottom: -0.25rem !important;
}

.mb-n2 {
  margin-bottom: -0.5rem !important;
}

.mb-n3 {
  margin-bottom: -1rem !important;
}

.mb-n4 {
  margin-bottom: -1.5rem !important;
}

.mb-n5 {
  margin-bottom: -2.5rem !important;
}

.mb-n10 {
  margin-bottom: -6rem !important;
}

.mb-n15 {
  margin-bottom: -9rem !important;
}

.ms-n1 {
  margin-left: -0.25rem !important;
}

.ms-n2 {
  margin-left: -0.5rem !important;
}

.ms-n3 {
  margin-left: -1rem !important;
}

.ms-n4 {
  margin-left: -1.5rem !important;
}

.ms-n5 {
  margin-left: -2.5rem !important;
}

.ms-n10 {
  margin-left: -6rem !important;
}

.ms-n15 {
  margin-left: -9rem !important;
}

.p-0 {
  padding: 0 !important;
}

.p-1 {
  padding: 0.25rem !important;
}

.p-2 {
  padding: 0.5rem !important;
}

.p-3 {
  padding: 1rem !important;
}

.p-4 {
  padding: 1.5rem !important;
}

.p-5 {
  padding: 2.5rem !important;
}

.p-10 {
  padding: 6rem !important;
}

.p-15 {
  padding: 9rem !important;
}

.px-0 {
  padding-right: 0 !important;
  padding-left: 0 !important;
}

.px-1 {
  padding-right: 0.25rem !important;
  padding-left: 0.25rem !important;
}

.px-2 {
  padding-right: 0.5rem !important;
  padding-left: 0.5rem !important;
}

.px-3 {
  padding-right: 1rem !important;
  padding-left: 1rem !important;
}

.px-4 {
  padding-right: 1.5rem !important;
  padding-left: 1.5rem !important;
}

.px-5 {
  padding-right: 2.5rem !important;
  padding-left: 2.5rem !important;
}

.px-10 {
  padding-right: 6rem !important;
  padding-left: 6rem !important;
}

.px-15 {
  padding-right: 9rem !important;
  padding-left: 9rem !important;
}

.py-0 {
  padding-top: 0 !important;
  padding-bottom: 0 !important;
}

.py-1 {
  padding-top: 0.25rem !important;
  padding-bottom: 0.25rem !important;
}

.py-2 {
  padding-top: 0.5rem !important;
  padding-bottom: 0.5rem !important;
}

.py-3 {
  padding-top: 1rem !important;
  padding-bottom: 1rem !important;
}

.py-4 {
  padding-top: 1.5rem !important;
  padding-bottom: 1.5rem !important;
}

.py-5 {
  padding-top: 2.5rem !important;
  padding-bottom: 2.5rem !important;
}

.py-10 {
  padding-top: 6rem !important;
  padding-bottom: 6rem !important;
}

.py-15 {
  padding-top: 9rem !important;
  padding-bottom: 9rem !important;
}

.pt-0 {
  padding-top: 0 !important;
}

.pt-1 {
  padding-top: 0.25rem !important;
}

.pt-2 {
  padding-top: 0.5rem !important;
}

.pt-3 {
  padding-top: 1rem !important;
}

.pt-4 {
  padding-top: 1.5rem !important;
}

.pt-5 {
  padding-top: 2.5rem !important;
}

.pt-10 {
  padding-top: 6rem !important;
}

.pt-15 {
  padding-top: 9rem !important;
}

.pe-0 {
  padding-right: 0 !important;
}

.pe-1 {
  padding-right: 0.25rem !important;
}

.pe-2 {
  padding-right: 0.5rem !important;
}

.pe-3 {
  padding-right: 1rem !important;
}

.pe-4 {
  padding-right: 1.5rem !important;
}

.pe-5 {
  padding-right: 2.5rem !important;
}

.pe-10 {
  padding-right: 6rem !important;
}

.pe-15 {
  padding-right: 9rem !important;
}

.pb-0 {
  padding-bottom: 0 !important;
}

.pb-1 {
  padding-bottom: 0.25rem !important;
}

.pb-2 {
  padding-bottom: 0.5rem !important;
}

.pb-3 {
  padding-bottom: 1rem !important;
}

.pb-4 {
  padding-bottom: 1.5rem !important;
}

.pb-5 {
  padding-bottom: 2.5rem !important;
}

.pb-10 {
  padding-bottom: 6rem !important;
}

.pb-15 {
  padding-bottom: 9rem !important;
}

.ps-0 {
  padding-left: 0 !important;
}

.ps-1 {
  padding-left: 0.25rem !important;
}

.ps-2 {
  padding-left: 0.5rem !important;
}

.ps-3 {
  padding-left: 1rem !important;
}

.ps-4 {
  padding-left: 1.5rem !important;
}

.ps-5 {
  padding-left: 2.5rem !important;
}

.ps-10 {
  padding-left: 6rem !important;
}

.ps-15 {
  padding-left: 9rem !important;
}

.d-none {
  display: none !important;
}

*, ::before, ::after {
    box-sizing: border-box;
}

.flat-right-side {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

.flat-left-side {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.grouped {
  position: relative;
  flex: 1 1 auto;
}


  
</style>

<button type="button" class="btn" golgi:prop="button" golgi:on_click="onClicked"></button>
  `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.position === 'right') {
        this.button.classList.add('float-end');
      }
      if (state.position === 'left') {
        this.button.classList.add('float-start');
      }
      if (state.position === 'center') {
        this.button.classList.add('float-center');
      }
      if (state.size === 'small') {
        this.button.classList.add('btn-sm');
      }
      if (state.size === 'large') {
        this.button.classList.add('btn-lg');
      }
      if (state.cls) {
        let clsArr = state.cls.split(' ');
        let _this = this;
        clsArr.forEach(function(cl) {
          _this.button.classList.add(cl);
        });
      }
      if (state.color) {
        this.button.classList.add('btn-' + state.color);
      }
      if (state.text) {
        this.button.textContent = state.text;
      }
      if (state.textContent) {
        this.button.textContent = state.textContent;
      }
      if (state.disabled) {
        this.button.setAttribute('disabled', 'disabled');
      }
    }

    set disabled(state) {
      if (state === true) {
        this.button.disabled = true;
      }
      else {
        this.button.disabled = false;
      }
    }

    get disabled() {
      return this.button.disabled;
    }

    onClicked() {
      this.emit('clicked');
    }

    onBeforeState() {
      this.form = this.getParentComponent('sbadmin-form');

      let btnGroup = this.getParentComponent('sbadmin-button-group');
      if (btnGroup) {
        this.cls = 'grouped';
        let btnArr = btnGroup.buttons;
        if (!this.button.classList.contains('d-none')) {
          if (btnArr.length > 0) {
            //flatten right-hand edge of previous button

            let prevBtn = btnArr[btnArr.length - 1];
            prevBtn.cls = 'flat-right-side';

            // flatten left edge of current button

            this.cls = 'flat-left-side';  
          }
        }
        btnArr.push(this);
      }

    }

    show() {
      this.rootElement.classList.remove('d-none');
    }

    hide() {
      this.rootElement.classList.add('d-none');
    }

    set cls(value) {
      this.setState({cls: value});
    }

    set text(value) {
      this.setState({text: value});
    }
    
  
  });
};