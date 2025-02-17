export function load(ctx) {
  let componentName = 'sbadmin-table';
  let count = -1;
  customElements.define(componentName, class sbadmin_table extends HTMLElement {
    constructor() {
      super();
      count++;
      this.attachShadow({ mode: 'open' });
      const html = `
<style>

table {
  caption-side: bottom;
  border-collapse: collapse;
}

caption {
  padding-top: 0.75rem;
  padding-bottom: 0.75rem;
  color: #a7aeb8;
  text-align: left;
}

th {
  text-align: inherit;
  text-align: -webkit-match-parent;
}

thead,
tbody,
tfoot,
tr,
td,
th {
  border-color: inherit;
  border-style: solid;
  border-width: 0;
}

.table, .dataTable-table {
  --bs-table-bg: transparent;
  --bs-table-accent-bg: transparent;
  --bs-table-striped-color: #69707a;
  --bs-table-striped-bg: rgba(0, 0, 0, 0.05);
  --bs-table-active-color: #69707a;
  --bs-table-active-bg: rgba(0, 0, 0, 0.1);
  --bs-table-hover-color: #69707a;
  --bs-table-hover-bg: rgba(224, 229, 236, 0.25);
  width: 100%;
  margin-bottom: 1rem;
  color: #69707a;
  vertical-align: top;
  border-color: #e0e5ec;
}
.table > :not(caption) > * > *, .dataTable-table > :not(caption) > * > * {
  padding: 0.75rem 0.75rem;
  background-color: var(--bs-table-bg);
  border-bottom-width: 1px;
  box-shadow: inset 0 0 0 9999px var(--bs-table-accent-bg);
}
.table > tbody, .dataTable-table > tbody {
  vertical-align: inherit;
}
.table > thead, .dataTable-table > thead {
  vertical-align: bottom;
}
.table > :not(:first-child), .dataTable-table > :not(:first-child) {
  border-top: 2px solid currentColor;
}

.caption-top {
  caption-side: top;
}

.table-sm > :not(caption) > * > * {
  padding: 0.25rem 0.25rem;
}

.table-bordered > :not(caption) > *, .dataTable-table > :not(caption) > * {
  border-width: 1px 0;
}
.table-bordered > :not(caption) > * > *, .dataTable-table > :not(caption) > * > * {
  border-width: 0 1px;
}

.table-borderless > :not(caption) > * > * {
  border-bottom-width: 0;
}
.table-borderless > :not(:first-child) {
  border-top-width: 0;
}

.table-striped > tbody > tr:nth-of-type(odd) > * {
  --bs-table-accent-bg: var(--bs-table-striped-bg);
  color: var(--bs-table-striped-color);
}

.table-active {
  --bs-table-accent-bg: var(--bs-table-active-bg);
  color: var(--bs-table-active-color);
}

.table-hover > tbody > tr:hover > *, .dataTable-table > tbody > tr:hover > * {
  --bs-table-accent-bg: var(--bs-table-hover-bg);
  color: var(--bs-table-hover-color);
}

.table-primary {
  --bs-table-bg: #ccdffc;
  --bs-table-striped-bg: #c2d4ef;
  --bs-table-striped-color: #000;
  --bs-table-active-bg: #b8c9e3;
  --bs-table-active-color: #000;
  --bs-table-hover-bg: #bdcee9;
  --bs-table-hover-color: #000;
  color: #000;
  border-color: #b8c9e3;
}

.table-secondary {
  --bs-table-bg: #e1ccf4;
  --bs-table-striped-bg: #d6c2e8;
  --bs-table-striped-color: #000;
  --bs-table-active-bg: #cbb8dc;
  --bs-table-active-color: #000;
  --bs-table-hover-bg: #d0bde2;
  --bs-table-hover-color: #000;
  color: #000;
  border-color: #cbb8dc;
}

.table-success {
  --bs-table-bg: #cceee1;
  --bs-table-striped-bg: #c2e2d6;
  --bs-table-striped-color: #000;
  --bs-table-active-bg: #b8d6cb;
  --bs-table-active-color: #000;
  --bs-table-hover-bg: #bddcd0;
  --bs-table-hover-color: #000;
  color: #000;
  border-color: #b8d6cb;
}

.table-info {
  --bs-table-bg: #ccf5f7;
  --bs-table-striped-bg: #c2e9eb;
  --bs-table-striped-color: #000;
  --bs-table-active-bg: #b8ddde;
  --bs-table-active-color: #000;
  --bs-table-hover-bg: #bde3e4;
  --bs-table-hover-color: #000;
  color: #000;
  border-color: #b8ddde;
}

.table-warning {
  --bs-table-bg: #fdeccc;
  --bs-table-striped-bg: #f0e0c2;
  --bs-table-striped-color: #000;
  --bs-table-active-bg: #e4d4b8;
  --bs-table-active-color: #000;
  --bs-table-hover-bg: #eadabd;
  --bs-table-hover-color: #000;
  color: #000;
  border-color: #e4d4b8;
}

.table-danger {
  --bs-table-bg: #fad0cc;
  --bs-table-striped-bg: #eec6c2;
  --bs-table-striped-color: #000;
  --bs-table-active-bg: #e1bbb8;
  --bs-table-active-color: #000;
  --bs-table-hover-bg: #e7c0bd;
  --bs-table-hover-color: #000;
  color: #000;
  border-color: #e1bbb8;
}

.table-light {
  --bs-table-bg: #f2f6fc;
  --bs-table-striped-bg: #e6eaef;
  --bs-table-striped-color: #000;
  --bs-table-active-bg: #dadde3;
  --bs-table-active-color: #000;
  --bs-table-hover-bg: #e0e4e9;
  --bs-table-hover-color: #000;
  color: #000;
  border-color: #dadde3;
}

.table-dark {
  --bs-table-bg: #212832;
  --bs-table-striped-bg: #2c333c;
  --bs-table-striped-color: #fff;
  --bs-table-active-bg: #373e47;
  --bs-table-active-color: #fff;
  --bs-table-hover-bg: #323841;
  --bs-table-hover-color: #fff;
  color: #fff;
  border-color: #373e47;
}

.center-text {
  text-align: center;
}

.table-responsive, .dataTable-wrapper .dataTable-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

@media (max-width: 575.98px) {
  .table-responsive-sm {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
@media (max-width: 767.98px) {
  .table-responsive-md {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
@media (max-width: 991.98px) {
  .table-responsive-lg {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
@media (max-width: 1199.98px) {
  .table-responsive-xl {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
@media (max-width: 1499.98px) {
  .table-responsive-xxl {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }
}
  
</style>

<table class="table">
  <thead golgi:prop="head"></thead>
  <tbody golgi:prop="body"></tbody>
</table>
  `;
      this.shadowRoot.innerHTML = `${html}`;
      this.name = componentName + '-' + count;
      
    }

    setState(state) {
      if (state.name) {
        this.name = state.name;
      }
      if (state.cls) {
        let clsArr = state.cls.split(' ');
        let _this = this;
        clsArr.forEach(function(cl) {
          _this.rootElement.classList.add(cl);
        });
      }
      if (state.hidden === true) {
        this.hide();
      }
    }

    set cls(value) {
      this.setState({cls: value});
    }

    render(data) {

      this.head.innerHTML = '';
      this.body.innerHTML = '';
      this.head.style = "display: ''";
      let _this = this;

      function addRow(parent) {
        let tr = document.createElement('tr');
        parent.appendChild(tr);
        return tr;
      }

      function addHeadCell(row, value, span) {
        let th = document.createElement('th');
        th.setAttribute('scope', 'col');
        if (span) th.setAttribute('colspan', span);
        if (typeof value !== 'undefined') th.textContent = value;
        row.appendChild(th);
        return th;
      }

      function addCell(row, value, span, cls, isInput, id, type) {
        let td = document.createElement('td');
        if (cls) {
          let pcs = cls.split(' ');
          for (let pc of pcs) {
            td.classList.add(pc);
          }
        }
        if (span) td.setAttribute('colspan', span);
        if (!isInput) {
          if (typeof value !== 'undefined') td.textContent = value;
        }
        else {
          let input = document.createElement('input');
          type = type || 'text'
          input.setAttribute('type', type);
          input.setAttribute('name', _this.name + '-' + type);
          input.value = value;
          if (id) input.id = id;
          td.appendChild(input);
        }
        row.appendChild(td);
        return td;
      }

      if (data.head) {
        let tr = addRow(this.head);
        for (let cell of data.head) {
          addHeadCell(tr, cell.value, cell.span);
        }
      }
      else {
        this.head.style = "display: none";
      }

      for (let row of data.body) {
        let tr = addRow(this.body);
        let c0 = row[0];
        if (c0.cls) {
          let pcs = c0.cls.split(' ');
          for (let pc of pcs) {
            tr.classList.add(pc);
          }
          row.shift();
        }
        for (let cell of row) {
          addCell(tr, cell.value, cell.span, cell.cls, cell.isInput, cell.id, cell.type);
        }
      }
    }

    show() {
      this.rootElement.style = "display:''";
    }

    hide() {
      this.rootElement.style = "display: none";
    }

  
  });
};