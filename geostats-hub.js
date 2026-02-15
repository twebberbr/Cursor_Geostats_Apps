(function () {
  const STORAGE_KEY = "geostats-project-v1";
  const TRANSFER_KEY = "geostats-project-transfer-v1";
  const FLOW = [
    { id: "declustering", file: "Declustering.html", label: "1. Declustering" },
    { id: "variography", file: "Variography.html", label: "2. Variography" },
    { id: "estimation", file: "Estimation.html", label: "3. Estimation" },
    { id: "simulation", file: "Simulation.html", label: "4. Simulation" },
    { id: "lagrange", file: "Lagrange.html", label: "5. Lagrange" }
  ];

  function safeJsonParse(text) {
    try {
      return JSON.parse(text);
    } catch (_) {
      return null;
    }
  }

  function setControlValue(id, value) {
    const el = document.getElementById(id);
    if (!el || value === undefined || value === null) return false;
    if (el.type === "checkbox") {
      el.checked = !!value;
      return true;
    }
    el.value = value;
    return true;
  }

  function defaultApplyPreset(presetName) {
    const presets = {
      isotropic_short_range: {
        nugget: 0.15,
        sill1: 0.85,
        range1: 35,
        rangeOrtho1: 35,
        useStruct1: true,
        useStruct2: false,
        anisoAngle: 0,
        modelNugget: 0.15,
        modelC1: 0.85,
        modelRange1: 35,
        modelRangeOrtho1: 35,
        modelC2: 0,
        modelRange2: 0,
        modelRangeOrtho2: 0
      },
      anisotropic_long_range: {
        nugget: 0.05,
        sill1: 0.65,
        range1: 140,
        rangeOrtho1: 55,
        useStruct1: true,
        useStruct2: true,
        sill2: 0.35,
        range2: 260,
        rangeOrtho2: 120,
        anisoAngle: 35,
        modelNugget: 0.05,
        modelC1: 0.65,
        modelRange1: 140,
        modelRangeOrtho1: 55,
        modelC2: 0.35,
        modelRange2: 260,
        modelRangeOrtho2: 120
      },
      high_nugget: {
        nugget: 0.45,
        sill1: 0.55,
        range1: 80,
        rangeOrtho1: 80,
        useStruct1: true,
        useStruct2: false,
        anisoAngle: 0,
        modelNugget: 0.45,
        modelC1: 0.55,
        modelRange1: 80,
        modelRangeOrtho1: 80,
        modelC2: 0,
        modelRange2: 0,
        modelRangeOrtho2: 0
      }
    };

    const selected = presets[presetName];
    if (!selected) return false;
    Object.keys(selected).forEach((id) => setControlValue(id, selected[id]));
    return true;
  }

  function nextStepId(currentLab) {
    const idx = FLOW.findIndex((item) => item.id === currentLab);
    if (idx < 0 || idx >= FLOW.length - 1) return null;
    return FLOW[idx + 1];
  }

  function install(options) {
    const opts = options || {};
    if (document.getElementById("gsHubPanel")) return;

    const leftPanel = document.getElementById("left-panel") || document.querySelector(".container");
    if (!leftPanel) return;

    const panel = document.createElement("div");
    panel.id = "gsHubPanel";
    panel.className = "gs-hub";

    const title = document.createElement("h3");
    title.textContent = "GeoStats Study Flow";
    panel.appendChild(title);

    const subtitle = document.createElement("p");
    subtitle.textContent = "Recommended order: Declustering -> Variography -> Estimation -> Simulation -> Lagrange.";
    panel.appendChild(subtitle);

    const flow = document.createElement("div");
    flow.className = "gs-hub-flow";
    FLOW.forEach((step) => {
      const link = document.createElement("a");
      link.href = step.file;
      link.textContent = step.label;
      if (step.id === opts.labId) link.classList.add("current");
      flow.appendChild(link);
    });
    panel.appendChild(flow);

    const presetRow = document.createElement("div");
    presetRow.className = "gs-hub-row";
    const presetSelect = document.createElement("select");
    presetSelect.id = "gsHubPresetSelect";
    presetSelect.innerHTML =
      '<option value="">Didactic presets</option>' +
      '<option value="isotropic_short_range">Isotropic short range</option>' +
      '<option value="anisotropic_long_range">Anisotropic long range</option>' +
      '<option value="high_nugget">High nugget / noisy</option>';
    const presetBtn = document.createElement("button");
    presetBtn.textContent = "Apply preset";
    presetRow.appendChild(presetSelect);
    presetRow.appendChild(presetBtn);
    panel.appendChild(presetRow);

    const checklistTitle = document.createElement("p");
    checklistTitle.style.marginBottom = "2px";
    checklistTitle.innerHTML = "<strong>Interpretation checklist</strong>";
    panel.appendChild(checklistTitle);

    const checklist = document.createElement("ul");
    checklist.className = "gs-hub-checklist";
    const checklistItems = opts.checklist || [
      "Do data support the model assumptions?",
      "Are local uncertainties coherent with sampling density?",
      "Would this choice change a practical decision?"
    ];
    checklistItems.forEach((text, idx) => {
      const li = document.createElement("li");
      const id = `gsHubCheck${idx}`;
      li.innerHTML = `<label><input type="checkbox" id="${id}"> ${text}</label>`;
      checklist.appendChild(li);
    });
    panel.appendChild(checklist);

    if (!opts.disableProjectIO) {
      const ioRow = document.createElement("div");
      ioRow.className = "gs-hub-row";
      const btnStore = document.createElement("button");
      btnStore.textContent = "Save project";
      const btnDownload = document.createElement("button");
      btnDownload.textContent = "Download JSON";
      const btnLoad = document.createElement("button");
      btnLoad.textContent = "Load JSON";
      const btnReceive = document.createElement("button");
      btnReceive.textContent = "Receive from previous";
      ioRow.appendChild(btnStore);
      ioRow.appendChild(btnDownload);
      ioRow.appendChild(btnLoad);
      ioRow.appendChild(btnReceive);
      panel.appendChild(ioRow);

      const transferRow = document.createElement("div");
      transferRow.className = "gs-hub-row";
      const btnSendNext = document.createElement("button");
      btnSendNext.textContent = "Send to next lab";
      transferRow.appendChild(btnSendNext);
      panel.appendChild(transferRow);

      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".json,application/json";
      fileInput.style.display = "none";
      panel.appendChild(fileInput);

      const status = document.createElement("p");
      status.className = "gs-hub-status";
      status.id = "gsHubStatus";
      panel.appendChild(status);

      function notify(message) {
        status.textContent = message;
      }

      function collectPayload() {
        const payload = {
          version: 1,
          sourceLab: opts.labId || "unknown",
          createdAt: new Date().toISOString(),
          data: {}
        };
        if (typeof opts.collectState === "function") {
          payload.data = opts.collectState() || {};
        }
        return payload;
      }

      function applyPayload(payload) {
        if (!payload || typeof payload !== "object") {
          notify("Invalid project payload.");
          return;
        }
        if (typeof opts.applyState === "function") {
          opts.applyState(payload.data || {}, payload);
        }
        notify(`Project loaded from ${payload.sourceLab || "unknown source"}.`);
      }

      btnStore.addEventListener("click", () => {
        const payload = collectPayload();
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        notify("Project saved to local storage.");
      });

      btnDownload.addEventListener("click", () => {
        const payload = collectPayload();
        const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json;charset=utf-8" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        const stamp = new Date().toISOString().replace(/[:.]/g, "-");
        a.href = url;
        a.download = `geostats_project_${opts.labId || "lab"}_${stamp}.json`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        notify("Project JSON downloaded.");
      });

      btnLoad.addEventListener("click", () => fileInput.click());

      fileInput.addEventListener("change", (event) => {
        const file = event.target.files && event.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = (e) => {
          const payload = safeJsonParse(String(e.target.result || ""));
          if (!payload) {
            notify("Invalid JSON file.");
            return;
          }
          applyPayload(payload);
        };
        reader.readAsText(file);
      });

      btnReceive.addEventListener("click", () => {
        const fromTransfer = safeJsonParse(localStorage.getItem(TRANSFER_KEY) || "");
        const fromStore = safeJsonParse(localStorage.getItem(STORAGE_KEY) || "");
        const payload = fromTransfer || fromStore;
        if (!payload) {
          notify("No saved project found.");
          return;
        }
        applyPayload(payload);
      });

      btnSendNext.addEventListener("click", () => {
        const payload = collectPayload();
        localStorage.setItem(TRANSFER_KEY, JSON.stringify(payload));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
        const next = nextStepId(opts.labId);
        if (!next) {
          notify("This is the last step in the suggested flow.");
          return;
        }
        notify(`Sending project to ${next.label}...`);
        window.location.href = next.file;
      });

      const transferPayload = safeJsonParse(localStorage.getItem(TRANSFER_KEY) || "");
      if (transferPayload && transferPayload.sourceLab && transferPayload.sourceLab !== opts.labId) {
        notify(`Pending transfer from ${transferPayload.sourceLab}. Click "Receive from previous".`);
      }
    }

    presetBtn.addEventListener("click", () => {
      const preset = presetSelect.value;
      if (!preset) return;
      if (typeof opts.applyPreset === "function") {
        opts.applyPreset(preset);
      } else {
        defaultApplyPreset(preset);
      }
      if (typeof opts.afterPreset === "function") {
        opts.afterPreset();
      }
    });

    const intro = leftPanel.querySelector(".lab-intro");
    if (intro) {
      intro.insertAdjacentElement("afterend", panel);
    } else {
      leftPanel.insertBefore(panel, leftPanel.firstChild);
    }
  }

  window.GeoStatsHub = {
    install,
    defaultApplyPreset
  };
})();
