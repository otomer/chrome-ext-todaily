(function() {
  let SOFTWARES = {
    jira: {
      containerStyle: `
        box-shadow: 0 4px 2px -2px rgba(0,0,0,0.4);
        text-align:center;
        height:30px;
        font-size:20px;
        color: white;
        top: 41px;
        width:100%;
        z-index: 999;
        position:fixed;`,

      buttonsSelector: '#js-work-quickfilters dd a[role=button]',
      buttonActiveClass: 'ghx-active',
    },
    // Could add more systems here
  };

  window.SOFTWARES = SOFTWARES;
})();
