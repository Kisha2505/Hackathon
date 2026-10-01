const API_BASE_URL = "http://127.0.0.1:5000";
let dashboardSummary = {
  total_springs: 0,
  healthy: 0,
  declining: 0,
  critical: 0,
  priority_springs: 0
};

let aiPrediction = {
  flow_reduction: 0,
  priority_score: 0,
  recharge_potential: "Unknown",
  risk_level: "Unknown",
  vulnerability_score: 0
};
function getAIPredictionMetrics(){return `<div class="metric"><span>Vulnerability Score</span><b class="red">${aiPrediction.vulnerability_score}%</b><span>SPR-001</span></div><div class="metric"><span>Priority Score</span><b>${aiPrediction.priority_score}%</b><span>SPR-001</span></div><div class="metric"><span>Recharge Potential</span><b class="green">${aiPrediction.recharge_potential}</b><span>SPR-001</span></div>`;}

async function loadDashboardFromBackend() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/dashboard`);
    const result = await response.json();

    if (result.success && result.summary) {
      dashboardSummary = result.summary;

      console.log(
        "✅ Dashboard loaded from backend:",
        dashboardSummary
      );

      if (!$("appPage").classList.contains("hidden")) {
        render(currentPage);
      }
    }
  } catch (error) {
    console.error(
      "❌ Dashboard backend connection failed:",
      error
    );
  }
}
async function loadAIPredictionFromBackend() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/ai/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        spring_id: "SPR-001",
        previous_flow: 25
      })
    });

    const result = await response.json();

    if (result.success && result.prediction) {
      aiPrediction = result.prediction;

      console.log(
        "✅ AI Prediction loaded from backend:",
        aiPrediction
      );

      if (!$("appPage").classList.contains("hidden")) {
        render(currentPage);
      }
    }
  } catch (error) {
    console.error(
      "❌ AI Prediction backend connection failed:",
      error
    );
  }
}
async function loadSpringsFromBackend() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/springs`);
    const result = await response.json();

    if (result.success && Array.isArray(result.data)) {
      springs.length = 0;

      result.data.forEach(s => {
        springs.push({
          id: s.id,
          name: s.name,
          location: s.village,
          flow: s.flow,
          prev: s.previous_flow,
          risk: s.risk,
          priority: s.priority,
          status: s.status,
          lat: s.lat,
          lng: s.lng,
          recharge: s.recharge,
          intervention: s.intervention,
          rainfall: s.rainfall
        });
      });

      console.log("✅ Springs loaded from backend:", springs);
      render(currentPage);
    }
  } catch (error) {
    console.error("❌ Backend connection failed:", error);
  }
}
const springs = [
  {id:"SPR-001",name:"Aruvikkal Spring",location:"Thiruvananthapuram Tribal Zone",flow:18,prev:25,risk:88,priority:92,status:"Critical",lat:8.55,lng:77.02,recharge:"High",intervention:"Recharge trench"},
  {id:"SPR-002",name:"Mala Spring",location:"Idukki Tribal Zone",flow:31,prev:34,risk:61,priority:68,status:"Declining",lat:9.82,lng:76.98,recharge:"Medium",intervention:"Percolation pits"},
  {id:"SPR-003",name:"Kurinji Spring",location:"Nilgiris Tribal Zone",flow:47,prev:45,risk:22,priority:31,status:"Healthy",lat:11.41,lng:76.70,recharge:"Low",intervention:"Monitoring"},
  {id:"SPR-004",name:"Pachai Spring",location:"Kolli Hills Tribal Zone",flow:22,prev:29,risk:79,priority:84,status:"Critical",lat:11.25,lng:78.35,recharge:"High",intervention:"Contour trenches"},
  {id:"SPR-005",name:"Mullai Spring",location:"Jawadhu Hills Tribal Zone",flow:39,prev:42,risk:48,priority:55,status:"Declining",lat:12.58,lng:78.95,recharge:"Medium",intervention:"Check dam"}
];
const officer = {id:"ADM-001", name:"Arun Kumar", role:"Admin Officer", location:"Nilgiris District, Tamil Nadu"};
let charts = {}, currentPage = "dashboard", liveTimer = null, mapInstance = null, activeRecognition = null, voiceActive = false;
const reports = [];
const $ = id => document.getElementById(id);
const statusBadge = s => `<span class="badge ${s==="Healthy"?"green":s==="Declining"?"orange":"red"}">${s}</span>`;

const T = {
  en:{eyebrow:"AI + GIS WATER INTELLIGENCE",loginSubtitle:"AI-Based Spring Revival & Recharge Planning for Tribal Areas",officerId:"Officer ID",password:"Password",officerPlaceholder:"Enter officer ID",passwordPlaceholder:"Enter password",signIn:"Sign in to dashboard →",demoLogin:"Admin Officer Demo · ID: admin · Password: 1234",waterIntelligence:"Spring & Water Intelligence",fieldCommand:"FIELD COMMAND",liveMonitoring:"Live monitoring active",overview:"Overview",villagesSprings:"Villages & Springs",satelliteMap:"Satellite & GIS Map",rainfallClimate:"Rainfall & Climate",structuresPlanning:"Structures & Planning",drainageFlow:"Drainage & Flow AI",iotMonitoring:"IoT & Monitoring",weatherRisk:"Live Weather & Risk",alerts:"Alerts",digitalTwin:"Digital Twin",fieldApp:"Field App",verification:"Structure Health & Verification",communityReports:"Community Reports",cloudIntelligence:"Cloud Intelligence",reports:"Reports",logout:"Logout",topEyebrow:"TRIBAL WATER SECURITY",statewide:"State-wide",searchPlaceholder:"Search villages, springs...",adminOfficer:"Admin Officer",liveSensor:"Live sensor monitoring",updated:"Updated",liveMonitoringTitle:"LIVE MONITORING",sensorSimulation:"Sensor simulation updates every 4 seconds",springFlowTrend:"Spring Flow Trend",lastMonths:"Last 6 months + live reading",recentAlerts:"Recent Alerts",liveFeed:"Live feed",prioritySprings:"Priority Springs",viewAll:"View all",currentNetworkFlow:"Current network flow",liveSample:"Live sample updating…",currentFlow:"Current Flow",previous:"Previous",risk:"Risk",status:"Status",location:"Location",priority:"Priority",rechargePotential:"Recharge Potential",totalSprings:"Total Springs",healthy:"Healthy",declining:"Declining",critical:"Critical",trackedLocations:"Tracked locations",currentlyStable:"Currently stable",needsAttention:"Needs attention",priorityIntervention:"Priority intervention",areaEstimate:"Area estimate",monitoring:"Spring Monitoring",prediction:"Drainage & Flow AI",map:"Satellite & GIS Map",recharge:"Structures & Planning",analytics:"Rainfall & Climate",iot:"IoT & Monitoring",weather:"Live Weather & Risk",digital:"Digital Twin",field:"Field App",verificationPage:"Structure Health & Verification",community:"Community Reports",cloud:"Cloud Intelligence",reportsPage:"Reports & Field Submission",help:"Help / Guide",submitReport:"＋ Submit Current Report",fieldReportCenter:"Field Report Center",submitDescription:"Submit the current spring condition observed by the logged-in officer.",recentSubmitted:"Recent Submitted Reports",springWise:"Spring-wise Report",downloadSummary:"Download Summary",rechargeReport:"Recharge Planning Report",submitCurrent:"Submit Current Field Report",loggedInAs:"Logged in as",observedCondition:"Observed Condition",fieldObservation:"Field Observation",actionRecommendation:"Action / Recommendation",submitCurrentBtn:"Submit Current Report",normal:"Normal",rechargeWork:"Recharge work required",focusCritical:"Focus Critical Springs",gisTitle:"GIS Spring & Recharge Map",gisSubtitle:"Tamil Nadu tribal spring monitoring zones",criticalLabel:"Critical",decliningLabel:"Declining",healthyLabel:"Healthy",readAloud:"Read current page aloud",voiceCommand:"Voice command",voiceListening:"Listening… say a command",voiceUnsupported:"Voice recognition is not supported in this browser.",voiceReady:"Voice command ready. Try: ‘Open map’, ‘Show reports’, or ‘Open overview’.",voiceOn:"VOICE ON",voiceOff:"VOICE OFF",helpTitle:"Help / Guide"},
  ta:{eyebrow:"AI + GIS நீர் நுண்ணறிவு",loginSubtitle:"பழங்குடியினர் பகுதிகளுக்கான ஊற்று மீட்பு மற்றும் நீர்ப்பிடிப்பு திட்டமிடல்",officerId:"அதிகாரி ID",password:"கடவுச்சொல்",officerPlaceholder:"அதிகாரி ID உள்ளிடவும்",passwordPlaceholder:"கடவுச்சொல் உள்ளிடவும்",signIn:"Dashboard-க்கு உள்நுழை →",demoLogin:"Admin Officer Demo · ID: admin · Password: 1234",waterIntelligence:"ஊற்று & நீர் நுண்ணறிவு",fieldCommand:"கள கட்டுப்பாடு",liveMonitoring:"நேரடி கண்காணிப்பு செயல்பாட்டில்",overview:"மேலோட்டம்",villagesSprings:"கிராமங்கள் & ஊற்றுகள்",satelliteMap:"செயற்கைக்கோள் & GIS வரைபடம்",rainfallClimate:"மழை & காலநிலை",structuresPlanning:"கட்டமைப்புகள் & திட்டமிடல்",drainageFlow:"வடிகால் & ஓட்ட AI",iotMonitoring:"IoT & கண்காணிப்பு",weatherRisk:"நேரடி வானிலை & அபாயம்",alerts:"எச்சரிக்கைகள்",digitalTwin:"டிஜிட்டல் ட்வின்",fieldApp:"கள செயலி",verification:"கட்டமைப்பு நிலை & சரிபார்ப்பு",communityReports:"சமூக அறிக்கைகள்",cloudIntelligence:"கிளவுட் நுண்ணறிவு",reports:"அறிக்கைகள்",logout:"வெளியேறு",topEyebrow:"பழங்குடியினர் நீர் பாதுகாப்பு",statewide:"மாநில அளவில்",searchPlaceholder:"கிராமங்கள், ஊற்றுகள் தேடவும்...",adminOfficer:"நிர்வாக அதிகாரி",updated:"புதுப்பிப்பு",liveMonitoringTitle:"நேரடி கண்காணிப்பு",sensorSimulation:"ஒவ்வொரு 4 விநாடிக்கும் மாதிரி தரவு புதுப்பிக்கப்படுகிறது",springFlowTrend:"ஊற்று ஓட்ட போக்கு",lastMonths:"கடந்த 6 மாதங்கள் + நேரடி அளவீடு",recentAlerts:"சமீபத்திய எச்சரிக்கைகள்",liveFeed:"நேரடி தகவல்",prioritySprings:"முக்கிய ஊற்றுகள்",viewAll:"அனைத்தையும் பார்க்க",currentNetworkFlow:"தற்போதைய சராசரி ஓட்டம்",liveSample:"நேரடி தரவு புதுப்பிக்கப்படுகிறது…",currentFlow:"தற்போதைய ஓட்டம்",previous:"முந்தைய",risk:"அபாயம்",status:"நிலை",location:"இடம்",priority:"முன்னுரிமை",rechargePotential:"நீர்ப்பிடிப்பு திறன்",totalSprings:"மொத்த ஊற்றுகள்",healthy:"நலமாக",declining:"குறைந்து வருகிறது",critical:"முக்கிய அபாயம்",trackedLocations:"கண்காணிப்பு இடங்கள்",currentlyStable:"தற்போது நிலையானது",needsAttention:"கவனம் தேவை",priorityIntervention:"முக்கிய தலையீடு",areaEstimate:"பகுதி மதிப்பீடு",monitoring:"ஊற்று கண்காணிப்பு",prediction:"வடிகால் & ஓட்ட AI",map:"செயற்கைக்கோள் & GIS வரைபடம்",recharge:"கட்டமைப்புகள் & திட்டமிடல்",analytics:"மழை & காலநிலை",iot:"IoT & கண்காணிப்பு",weather:"நேரடி வானிலை & அபாயம்",digital:"டிஜிட்டல் ட்வின்",field:"கள செயலி",verificationPage:"கட்டமைப்பு நிலை & சரிபார்ப்பு",community:"சமூக அறிக்கைகள்",cloud:"கிளவுட் நுண்ணறிவு",reportsPage:"அறிக்கைகள் & கள சமர்ப்பிப்பு",map:()=>`<div class="card">
  <div id="map"></div>
</div>`, help:"உதவி / வழிகாட்டி",submitReport:"＋ தற்போதைய அறிக்கை",fieldReportCenter:"கள அறிக்கை மையம்",submitDescription:"உள்நுழைந்த அதிகாரி கவனித்த தற்போதைய ஊற்று நிலையை சமர்ப்பிக்கவும்.",recentSubmitted:"சமீபத்திய சமர்ப்பித்த அறிக்கைகள்",springWise:"ஊற்று வாரியான அறிக்கை",downloadSummary:"சுருக்கத்தை பதிவிறக்க",rechargeReport:"நீர்ப்பிடிப்பு திட்ட அறிக்கை",submitCurrent:"தற்போதைய கள அறிக்கை",loggedInAs:"உள்நுழைந்தவர்",observedCondition:"கவனிக்கப்பட்ட நிலை",fieldObservation:"களக் கவனிப்பு",actionRecommendation:"செயல் / பரிந்துரை",submitCurrentBtn:"தற்போதைய அறிக்கையை சமர்ப்பிக்க",normal:"இயல்பு",rechargeWork:"நீர்ப்பிடிப்பு பணி தேவை",focusCritical:"முக்கிய ஊற்றுகளை காண்பி",gisTitle:"GIS ஊற்று & நீர்ப்பிடிப்பு வரைபடம்",gisSubtitle:"தமிழ்நாடு பழங்குடியினர் ஊற்று கண்காணிப்பு பகுதிகள்",criticalLabel:"முக்கிய அபாயம்",decliningLabel:"குறைவு",healthyLabel:"நலம்",readAloud:"தற்போதைய பக்கத்தை வாசிக்க",voiceCommand:"குரல் கட்டளை",voiceListening:"கேட்கிறது… கட்டளை சொல்லவும்",voiceUnsupported:"இந்த browser-ல் குரல் அடையாளம் ஆதரிக்கப்படவில்லை.",voiceReady:"குரல் கட்டளை தயார். ‘வரைபடம் திற’, ‘அறிக்கைகள் காட்டு’, அல்லது ‘மேலோட்டம்’ என்று சொல்லலாம்.",voiceOn:"குரல் ON",voiceOff:"குரல் OFF",helpTitle:"உதவி / வழிகாட்டி"},
  hi:{eyebrow:"AI + GIS जल बुद्धिमत्ता",loginSubtitle:"जनजातीय क्षेत्रों के लिए स्प्रिंग पुनर्जीवन और रिचार्ज योजना",officerId:"अधिकारी ID",password:"पासवर्ड",officerPlaceholder:"अधिकारी ID दर्ज करें",passwordPlaceholder:"पासवर्ड दर्ज करें",signIn:"डैशबोर्ड में साइन इन →",demoLogin:"Admin Officer Demo · ID: admin · Password: 1234",waterIntelligence:"स्प्रिंग और जल बुद्धिमत्ता",fieldCommand:"फील्ड कमांड",liveMonitoring:"लाइव मॉनिटरिंग सक्रिय",overview:"ओवरव्यू",villagesSprings:"गांव और स्प्रिंग",satelliteMap:"सैटेलाइट और GIS मैप",rainfallClimate:"वर्षा और जलवायु",structuresPlanning:"संरचनाएं और योजना",drainageFlow:"ड्रेनेज और फ्लो AI",iotMonitoring:"IoT और मॉनिटरिंग",weatherRisk:"लाइव मौसम और जोखिम",alerts:"अलर्ट",digitalTwin:"डिजिटल ट्विन",fieldApp:"फील्ड ऐप",verification:"संरचना स्वास्थ्य और सत्यापन",communityReports:"समुदाय रिपोर्ट",cloudIntelligence:"क्लाउड इंटेलिजेंस",reports:"रिपोर्ट",logout:"लॉग आउट",topEyebrow:"जनजातीय जल सुरक्षा",statewide:"राज्य स्तर",searchPlaceholder:"गांव, स्प्रिंग खोजें...",adminOfficer:"प्रशासनिक अधिकारी",updated:"अपडेट",liveMonitoringTitle:"लाइव मॉनिटरिंग",sensorSimulation:"हर 4 सेकंड में सिमुलेटेड सेंसर डेटा अपडेट होता है",springFlowTrend:"स्प्रिंग फ्लो ट्रेंड",lastMonths:"पिछले 6 महीने + लाइव रीडिंग",recentAlerts:"हाल के अलर्ट",liveFeed:"लाइव फीड",prioritySprings:"प्राथमिकता स्प्रिंग",viewAll:"सभी देखें",currentNetworkFlow:"वर्तमान औसत फ्लो",liveSample:"लाइव सैंपल अपडेट हो रहा है…",currentFlow:"वर्तमान फ्लो",previous:"पिछला",risk:"जोखिम",status:"स्थिति",location:"स्थान",priority:"प्राथमिकता",rechargePotential:"रिचार्ज क्षमता",totalSprings:"कुल स्प्रिंग",healthy:"स्वस्थ",declining:"गिरावट",critical:"गंभीर",trackedLocations:"ट्रैक किए गए स्थान",currentlyStable:"वर्तमान में स्थिर",needsAttention:"ध्यान आवश्यक",priorityIntervention:"प्राथमिक हस्तक्षेप",areaEstimate:"क्षेत्र अनुमान",monitoring:"स्प्रिंग मॉनिटरिंग",prediction:"ड्रेनेज और फ्लो AI",map:"सैटेलाइट और GIS मैप",recharge:"संरचनाएं और योजना",analytics:"वर्षा और जलवायु",iot:"IoT और मॉनिटरिंग",weather:"लाइव मौसम और जोखिम",digital:"डिजिटल ट्विन",field:"फील्ड ऐप",verificationPage:"संरचना स्वास्थ्य और सत्यापन",community:"समुदाय रिपोर्ट",cloud:"क्लाउड इंटेलिजेंस",reportsPage:"रिपोर्ट और फील्ड सबमिशन",help:"सहायता / गाइड",submitReport:"＋ वर्तमान रिपोर्ट भेजें",fieldReportCenter:"फील्ड रिपोर्ट केंद्र",submitDescription:"लॉग-इन अधिकारी द्वारा देखी गई वर्तमान स्प्रिंग स्थिति भेजें।",recentSubmitted:"हाल की भेजी गई रिपोर्ट",springWise:"स्प्रिंग-वार रिपोर्ट",downloadSummary:"सारांश डाउनलोड",rechargeReport:"रिचार्ज प्लानिंग रिपोर्ट",submitCurrent:"वर्तमान फील्ड रिपोर्ट",loggedInAs:"लॉग-इन",observedCondition:"देखी गई स्थिति",fieldObservation:"फील्ड निरीक्षण",actionRecommendation:"कार्रवाई / सुझाव",submitCurrentBtn:"वर्तमान रिपोर्ट भेजें",normal:"सामान्य",rechargeWork:"रिचार्ज कार्य आवश्यक",focusCritical:"गंभीर स्प्रिंग दिखाएं",gisTitle:"GIS स्प्रिंग और रिचार्ज मैप",gisSubtitle:"तमिलनाडु जनजातीय स्प्रिंग मॉनिटरिंग क्षेत्र",criticalLabel:"गंभीर",decliningLabel:"गिरावट",healthyLabel:"स्वस्थ",readAloud:"वर्तमान पेज पढ़ें",voiceCommand:"वॉइस कमांड",voiceListening:"सुन रहा है… कमांड बोलें",voiceUnsupported:"इस ब्राउज़र में वॉइस रिकग्निशन समर्थित नहीं है।",voiceReady:"वॉइस कमांड तैयार है। ‘मैप खोलें’, ‘रिपोर्ट दिखाएं’ या ‘ओवरव्यू’ बोलें।",voiceOn:"वॉइस ON",voiceOff:"वॉइस OFF",helpTitle:"सहायता / गाइड"}
};
let lang = localStorage.getItem("springLang") || "en";
function t(k){return (T[lang]&&T[lang][k])||T.en[k]||k}
function applyLanguage(){
  document.documentElement.lang=lang; document.querySelectorAll("[data-i18n]").forEach(el=>el.textContent=t(el.dataset.i18n));
  document.querySelectorAll("[data-placeholder]").forEach(el=>el.placeholder=t(el.dataset.placeholder));
  if($('languageSelect')) $('languageSelect').value=lang;
  if(!$('appPage').classList.contains('hidden')) render(currentPage);
}

$("loginForm").addEventListener("submit", e=>{e.preventDefault();const u=$("username").value.trim(),p=$("password").value;if((u.toLowerCase()==="admin"&&p==="1234")||(u.length>0&&p.length>0)){$("loginPage").classList.add("hidden");$("appPage").classList.remove("hidden");render("dashboard");startLiveUpdates()}else alert("Enter valid login details.")});
$("logoutBtn").onclick=()=>{stopLiveUpdates();$("appPage").classList.add("hidden");$("loginPage").classList.remove("hidden")};
document.querySelectorAll(".nav-item").forEach(btn=>btn.addEventListener("click",()=>render(btn.dataset.page)));
$("languageSelect").addEventListener("change",e=>{lang=e.target.value;localStorage.setItem("springLang",lang);applyLanguage();updateVoiceButton();showVoiceStatus(t("voiceOff"),false)});
$("speakBtn").addEventListener("click",toggleSpeak);
$("voiceBtn").addEventListener("click",toggleVoiceRecognition);
$("ccBtn").addEventListener("click",()=>{const s=$("voiceStatus");s.classList.toggle("hidden");s.textContent=s.classList.contains("hidden")?"":t("voiceReady")});
document.querySelectorAll(".nav-item")[2].addEventListener("click", () => render("map"));
$("helpBtn").addEventListener("click",()=>render("help"));
$("settingsBtn").addEventListener("click",()=>render("help"));
updateVoiceButton();
$("globalSearch").addEventListener("keydown",e=>{if(e.key==="Enter"){const q=e.target.value.toLowerCase();const match=springs.find(s=>(s.name+" "+s.id+" "+s.location).toLowerCase().includes(q));if(match){alert(`${match.id} — ${match.name}\n${match.location}\nFlow: ${match.flow} L/min\nStatus: ${match.status}`)}else alert("No matching spring found in demo data.")}});

const pages = {
dashboard:()=>`<div class="live-strip"><span class="pulse"></span><b>${t("liveMonitoringTitle")}</b><span>${t("sensorSimulation")}</span><span class="live-time" id="liveTime">${t("updated")} just now</span></div><div class="grid kpi-grid">${kpi(t("totalSprings"),"05",t("trackedLocations"),"blue")}${kpi(t("healthy"),countStatus("Healthy"),t("currentlyStable"),"green")}${kpi(t("declining"),countStatus("Declining"),t("needsAttention"),"orange")}${kpi(t("critical"),countStatus("Critical"),t("priorityIntervention"),"red")}${kpi(t("rechargePotential"),"72%",t("areaEstimate"),"green")}</div><div class="grid section-grid"><div class="card"><div class="card-title"><h3>${t("springFlowTrend")} <span class="live-chip">LIVE</span></h3><span class="muted">${t("lastMonths")}</span></div><div class="chart-wrap"><canvas id="flowChart"></canvas></div><div class="flow-reading"><b id="liveFlowText">${t("currentNetworkFlow")}: 31 L/min avg.</b><span id="flowUpdateText">${t("liveSample")}</span></div></div><div class="card"><div class="card-title"><h3>${t("recentAlerts")}</h3><span class="muted">${t("liveFeed")}</span></div><div class="alert-list"><div class="alert redline"><strong>SPR-001 critical flow reduction</strong><small>Thiruvananthapuram Tribal Zone · 18 L/min current flow</small></div><div class="alert redline"><strong>SPR-004 needs recharge planning</strong><small>Kolli Hills Tribal Zone · 84 priority score</small></div><div class="alert"><strong>SPR-002 status changed to declining</strong><small>Idukki Tribal Zone · monitored today</small></div></div></div></div><div class="card" style="margin-top:18px"><div class="card-title"><h3>${t("prioritySprings")}</h3><button class="secondary" onclick="render('monitoring')">${t("viewAll")}</button></div>${springTable(springs.filter(s=>s.priority>=80))}</div>`,
monitoring:()=>`<div class="card"><div class="card-title"><h3>${t("monitoring")}</h3><select class="filter" id="statusFilter"><option>All</option><option>Healthy</option><option>Declining</option><option>Critical</option></select></div><div class="table-wrap"><table class="table"><thead><tr><th>Spring</th><th>${t("location")}</th><th>${t("currentFlow")}</th><th>${t("previous")}</th><th>${t("risk")}</th><th>${t("status")}</th></tr></thead><tbody id="monitorRows">${monitorRows(springs)}</tbody></table></div></div>`,
map:()=>`<div class="card">
  <div class="card-title">
    <div>
      <h3>${t("gisTitle")}</h3>
      <span class="muted">${t("gisSubtitle")}</span>
    </div>
    <button class="secondary" onclick="focusCritical()">
      ${t("focusCritical")}
    </button>
  </div>

  <div id="map"></div>

  <div class="legend">
    <span><i class="dot r"></i> ${t("criticalLabel")}</span>
    <span><i class="dot o"></i> ${t("decliningLabel")}</span>
    <span><i class="dot g"></i> ${t("healthyLabel")}</span>
    <span>● Recharge zone</span>
  </div>
</div>`,
recharge:()=>`<div class="card"><div class="card-title"><h3>${t("structuresPlanning")}</h3><span class="muted">AI + GIS decision support</span></div><div class="table-wrap"><table class="table"><thead><tr><th>Spring</th><th>${t("priority")}</th><th>${t("rechargePotential")}</th><th>Suggested Intervention</th><th>Reason</th></tr></thead><tbody>${springs.map(s=>`<tr><td><b>${s.id}</b><br><span class="muted">${s.location}</span></td><td><b>${s.priority}%</b></td><td>${s.recharge}</td><td>${s.intervention}</td><td>${s.risk>70?"High vulnerability + declining flow":"Moderate condition; preventive recharge planning"}</td></tr>`).join("")}</tbody></table></div></div>`,
analytics:()=>`<div class="page-grid"><div class="card"><div class="card-title"><h3>${t("rainfallClimate")}</h3><span class="muted">Monthly</span></div><div class="chart-wrap"><canvas id="rainChart"></canvas></div></div><div class="card"><div class="card-title"><h3>Spring Flow Comparison</h3><span class="muted">Current vs previous</span></div><div class="chart-wrap"><canvas id="compareChart"></canvas></div></div><div class="card wide"><div class="card-title"><h3>Climate Insight</h3></div><p class="muted">Rainfall and spring-flow readings can be connected to satellite and field datasets in the real deployment.</p></div></div>`,
iot:()=>`<div class="page-grid"><div class="card wide"><div class="card-title"><h3>${t("iotMonitoring")}</h3><span class="badge green">LIVE</span></div><div class="metric-row"><div class="metric"><span>Connected Flow Sensors</span><b>12</b><span>11 online · 1 standby</span></div><div class="metric"><span>Rain Gauges</span><b>08</b><span>All online</span></div><div class="metric"><span>Last Gateway Sync</span><b>12 sec</b><span>Healthy connection</span></div></div></div><div class="card"><h3>Sensor Feed</h3><p class="muted">Live prototype readings are simulated every 4 seconds. The same UI can consume REST/IoT API values.</p></div><div class="card"><h3>Device Health</h3><div class="progress"><i style="width:92%"></i></div><p class="muted">92% devices reporting normally.</p></div></div>`,
weather:()=>`<div class="page-grid"><div class="card wide"><div class="card-title"><h3>${t("weatherRisk")}</h3><span class="badge orange">Moderate Risk</span></div><div class="metric-row"><div class="metric"><span>Rainfall Today</span><b>12 mm</b><span>Expected 18 mm</span></div><div class="metric"><span>Temperature</span><b>27°C</b><span>Nilgiris zone</span></div><div class="metric"><span>Recharge Risk</span><b class="orange">61%</b><span>Watch declining springs</span></div></div></div><div class="card"><h3>Field Weather Note</h3><p class="muted">Weather data is simulated for the prototype. Connect IMD/weather APIs for real-time deployment.</p></div></div>`,
alerts:()=>`<div class="page-grid"><div class="card"><div class="card-title"><h3>${t("alerts")}</h3><span class="badge red">06 active</span></div><div class="alert-list"><div class="alert redline"><strong>SPR-001 — Critical</strong><small>Flow dropped from 25 to 18 L/min.</small></div><div class="alert redline"><strong>SPR-004 — Recharge priority</strong><small>Priority score is 84%.</small></div><div class="alert"><strong>SPR-002 — Declining</strong><small>Flow trend requires continued observation.</small></div></div></div><div class="card"><h3>Notification Center</h3><p class="muted">Alerts can be pushed to officers through SMS, email or the field app after backend integration.</p></div></div>`,
digital:()=>`<div class="page-grid"><div class="card wide"><div class="card-title"><h3>${t("digitalTwin")}</h3><span class="badge blue">Prototype</span></div><p class="muted">Digital representation of spring, terrain, flow and recharge structures. Select a spring to inspect its virtual condition.</p>${springTable(springs)}</div></div>`,
field:()=>`<div class="page-grid"><div class="card wide"><div class="card-title"><h3>${t("fieldApp")}</h3><span class="badge green">Officer Mode</span></div><div class="action-row"><button class="primary-btn" onclick="openReportModal()">${t("submitReport")}</button><button class="secondary" onclick="render('map')">Open GIS Map</button><button class="secondary" onclick="render('monitoring')">Open Spring List</button></div><div class="voice-help" style="margin-top:15px">🎙 ${t("voiceReady")}</div></div></div>`,
verification:()=>`<div class="page-grid"><div class="card wide"><div class="card-title"><h3>${t("verificationPage")}</h3><span class="muted">Field validation queue</span></div>${springs.map(s=>`<div class="step"><b>✓</b><div><strong>${s.id} · ${s.name}</strong><br><span class="muted">${s.intervention} · ${s.status} · Last verification: Today</span></div></div>`).join("")}</div></div>`,
community:()=>`<div class="page-grid"><div class="card wide"><div class="card-title"><h3>${t("communityReports")}</h3><span class="badge green">18 reports</span></div><div class="table-wrap"><table class="table"><thead><tr><th>Village</th><th>Community Report</th><th>Severity</th><th>Action</th></tr></thead><tbody><tr><td>Nilgiri Hamlet</td><td>Spring flow reduced after dry week</td><td>${statusBadge("Declining")}</td><td>Field verification</td></tr><tr><td>Kolli Hills</td><td>Recharge trench requested</td><td>${statusBadge("Critical")}</td><td>Planning review</td></tr><tr><td>Jawadhu Hills</td><td>Flow stable</td><td>${statusBadge("Healthy")}</td><td>Continue monitoring</td></tr></tbody></table></div></div></div>`,
cloud:()=>`<div class="page-grid"><div class="card wide"><div class="card-title"><h3>${t("cloudIntelligence")}</h3><span class="badge green">Connected</span></div><div class="metric-row"><div class="metric"><span>Spring Records</span><b>168</b><span>Synced</span></div><div class="metric"><span>Satellite Tiles</span><b>42</b><span>Latest pass</span></div><div class="metric"><span>ML Jobs</span><b>03</b><span>Completed today</span></div></div></div></div>`,
reports:()=>`<div class="report-top"><div><b>${t("fieldReportCenter")}</b><span>${t("submitDescription")}</span></div><button class="primary-btn" onclick="openReportModal()">${t("submitReport")}</button></div><div class="page-grid"><div class="card wide"><div class="card-title"><h3>${t("recentSubmitted")}</h3><span class="badge green">${t("adminOfficer")}: ${officer.name}</span></div>${reportTable()}</div><div class="card"><div class="card-title"><h3>${t("springWise")}</h3></div><p class="muted">Summary of flow, status, risk and priority.</p><button class="secondary" onclick="downloadReport('Spring-wise Report')">${t("downloadSummary")}</button></div><div class="card"><div class="card-title"><h3>${t("rechargeReport")}</h3></div><p class="muted">Recommended zones and interventions for field validation.</p><button class="secondary" onclick="downloadReport('Recharge Planning Report')">${t("downloadSummary")}</button></div></div>${reportModal()}`,
help:()=>`<div class="page-grid"><div class="card help-card wide"><h3>${t("help")}</h3><div class="step"><b>1</b><div><strong>Login as an officer</strong><br><span class="muted">Use the demo Officer ID and password to open the dashboard.</span></div></div><div class="step"><b>2</b><div><strong>Change language</strong><br><span class="muted">Use the language selector in the top bar. English, Tamil and Hindi are supported in this prototype.</span></div></div><div class="step"><b>3</b><div><strong>Use voice commands</strong><br><span class="muted">Press 🎙 and say “Open map”, “Show reports”, “Open monitoring”, or “Go to overview”.</span></div></div><div class="step"><b>4</b><div><strong>Submit current report</strong><br><span class="muted">Open Reports or Field App and submit the latest field observation.</span></div></div></div><div class="card"><h3>Voice & Language</h3><p class="muted">Voice recognition uses the browser Speech Recognition API. Voice reading uses Speech Synthesis. Availability depends on the browser and microphone permission.</p></div></div>`
};

function kpi(label,value,hint,color){return `<div class="card kpi"><div class="label">${label}</div><div class="value ${color}">${value}</div><div class="hint">${hint}</div></div>`}
function countStatus(s){return springs.filter(x=>x.status===s).length.toString().padStart(2,"0")}
function monitorRows(arr){return arr.map(s=>`<tr><td><b>${s.id}</b><br><span class="muted">${s.name}</span></td><td>${s.location}</td><td><b>${s.flow} L/min</b></td><td>${s.prev} L/min</td><td>${s.risk}%</td><td>${statusBadge(s.status)}</td></tr>`).join("")}
function springTable(arr){return `<div class="table-wrap"><table class="table"><thead><tr><th>Spring</th><th>${t("location")}</th><th>${t("priority")}</th><th>${t("status")}</th></tr></thead><tbody>${arr.map(s=>`<tr><td><b>${s.id}</b> · ${s.name}</td><td>${s.location}</td><td><b>${s.priority}%</b></td><td>${statusBadge(s.status)}</td></tr>`).join("")}</tbody></table></div>`}
const pageBackgrounds={monitoring:"assets/photo01.jpg",analytics:"assets/photo02.jpg",recharge:"assets/photo03.jpg",prediction:"assets/photo04.jpg",weather:"assets/photo05.jpg",alerts:"assets/photo06.jpg",digital:"assets/photo07.jpg",field:"assets/photo08.jpg",verification:"assets/photo09.jpg",community:"assets/photo10.jpg",cloud:"assets/photo11.jpg",reports:"assets/photo12.jpg",help:"assets/photo14.jpg",dashboard:"assets/photo01.jpg",map:"assets/photo01.jpg",iot:"assets/photo09.jpg"};
function initPage(page){if(page==="dashboard")drawFlow();if(page==="monitoring")$("statusFilter").addEventListener("change",e=>{$("monitorRows").innerHTML=monitorRows(e.target.value==="All"?springs:springs.filter(s=>s.status===e.target.value))});if(page==="map")initMap();if(page==="analytics")drawAnalytics()}
function render(page){currentPage=page;document.documentElement.style.setProperty("--page-bg",pageBackgrounds[page]?`url("${pageBackgrounds[page]}")`:"none");document.querySelectorAll(".nav-item").forEach(b=>b.classList.toggle("active",b.dataset.page===page));const titles={dashboard:t("overview"),monitoring:t("villagesSprings"),prediction:t("drainageFlow"),map:t("satelliteMap"),recharge:t("structuresPlanning"),analytics:t("rainfallClimate"),iot:t("iotMonitoring"),weather:t("weatherRisk"),alerts:t("alerts"),digital:t("digitalTwin"),field:t("fieldApp"),verification:t("verificationPage"),community:t("communityReports"),cloud:t("cloudIntelligence"),reports:t("reportsPage"),help:t("helpTitle")};$("pageTitle").textContent=titles[page]||t("overview");$("crumbPage").textContent=titles[page]||t("overview");$("content").innerHTML=pages[page]();setTimeout(()=>initPage(page),0)}
function drawFlow(){const avg=Math.round(springs.reduce((a,s)=>a+s.flow,0)/springs.length);if(charts.flow)charts.flow.destroy();charts.flow=new Chart($("flowChart"),{type:"line",data:{labels:["Apr","May","Jun","Jul","Aug","Sep","LIVE"],datasets:[{label:"Average flow (L/min)",data:[42,39,37,34,31,29,avg],tension:.35,borderWidth:3,pointRadius:4}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}},scales:{y:{beginAtZero:false}}}});$("liveFlowText").textContent=`${t("currentNetworkFlow")}: ${avg} L/min avg.`}
function drawAnalytics(){charts.rain=new Chart($("rainChart"),{type:"bar",data:{labels:["Apr","May","Jun","Jul","Aug","Sep"],datasets:[{label:"Rainfall (mm)",data:[112,95,140,128,102,88],borderRadius:7}]},options:{responsive:true,maintainAspectRatio:false,plugins:{legend:{display:false}}}});charts.compare=new Chart($("compareChart"),{type:"bar",data:{labels:springs.map(s=>s.id),datasets:[{label:"Current",data:springs.map(s=>s.flow)},{label:"Previous",data:springs.map(s=>s.prev)}]},options:{responsive:true,maintainAspectRatio:false}})}
function initMap(){mapInstance=L.map("map").setView([11.1,78.1],7);L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{attribution:"© OpenStreetMap contributors"}).addTo(mapInstance);const group=[];springs.forEach(s=>{const color=s.status==="Critical"?"#d54848":s.status==="Declining"?"#d98a28":"#25a06f";const m=L.circleMarker([s.lat,s.lng],{radius:10,color,fillColor:color,fillOpacity:.86,weight:2}).bindPopup(`<div class="map-popup"><b>${s.id} · ${s.name}</b><br>${s.location}<br><strong>${t("status")}:</strong> ${s.status}<br><strong>${t("currentFlow")}:</strong> ${s.flow} L/min<br><strong>${t("risk")}:</strong> ${s.risk}%<br><strong>${t("rechargePotential")}:</strong> ${s.recharge}</div>`).addTo(mapInstance);group.push(m)});if(group.length)mapInstance.fitBounds(L.featureGroup(group).getBounds().pad(.25))}
function focusCritical(){if(!mapInstance)return;const critical=springs.filter(s=>s.status==="Critical");mapInstance.fitBounds(L.latLngBounds(critical.map(s=>[s.lat,s.lng])).pad(.8))}
function startLiveUpdates(){stopLiveUpdates();liveTimer=setInterval(()=>{springs.forEach(s=>{const delta=(Math.random()-.5)*2.4;s.flow=Math.max(8,Math.round((s.flow+delta)*10)/10)});if(currentPage==="dashboard"&&charts.flow){const avg=Math.round(springs.reduce((a,s)=>a+s.flow,0)/springs.length);charts.flow.data.datasets[0].data[6]=avg;charts.flow.update();$("liveFlowText").textContent=`${t("currentNetworkFlow")}: ${avg} L/min avg.`;$("flowUpdateText").textContent=`${t("updated")}: ${new Date().toLocaleTimeString()}`;$("liveTime").textContent=`${t("updated")} ${new Date().toLocaleTimeString()}`}},4000)}
function stopLiveUpdates(){if(liveTimer){clearInterval(liveTimer);liveTimer=null}}
function reportTable(){if(!reports.length)return `<div class="empty-state">No field reports submitted yet. Click <b>${t("submitReport")}</b> to add the first report.</div>`;return `<div class="table-wrap"><table class="table"><thead><tr><th>Time</th><th>Spring</th><th>${t("observedCondition")}</th><th>${t("currentFlow")}</th><th>${t("adminOfficer")}</th><th>${t("status")}</th></tr></thead><tbody>${reports.map(r=>`<tr><td>${r.time}</td><td><b>${r.spring}</b><br><span class="muted">${r.location}</span></td><td>${r.condition}</td><td>${r.flow} L/min</td><td>${r.officer}</td><td><span class="badge green">Submitted</span></td></tr>`).join("")}</tbody></table></div>`}
function reportModal(){return `<div id="reportModal" class="modal hidden"><div class="modal-card"><div class="card-title"><div><h3>${t("submitCurrent")}</h3><span class="muted">${t("loggedInAs")} ${officer.name} · ${officer.location}</span></div><button class="modal-close" onclick="closeReportModal()">×</button></div><form id="reportForm" onsubmit="submitReport(event)"><div class="form-grid"><div><label>Spring</label><select id="reportSpring">${springs.map(s=>`<option value="${s.id}">${s.id} — ${s.name}</option>`).join("")}</select></div><div><label>${t("currentFlow")} (L/min)</label><input id="reportFlow" type="number" step="0.1" required></div><div><label>${t("observedCondition")}</label><select id="reportCondition"><option>${t("normal")}</option><option>${t("declining")}</option><option>${t("critical")}</option><option>${t("rechargeWork")}</option></select></div><div><label>${t("location")}</label><input value="${officer.location}" readonly></div></div><label>${t("fieldObservation")}</label><textarea id="reportNote" rows="3" placeholder="Enter current field observation..." required></textarea><label>${t("actionRecommendation")}</label><textarea id="reportAction" rows="3" placeholder="Example: Start recharge trench inspection..." required></textarea><button class="primary-btn full" type="submit">${t("submitCurrentBtn")}</button></form></div></div>`}
function openReportModal(){const modal=$("reportModal");if(modal){modal.classList.remove("hidden");const s=springs[0];$("reportFlow").value=s.flow;$("reportSpring").addEventListener("change",e=>{const x=springs.find(z=>z.id===e.target.value);$("reportFlow").value=x.flow})}}
function closeReportModal(){const m=$("reportModal");if(m)m.classList.add("hidden")}
function submitReport(e){e.preventDefault();const s=springs.find(x=>x.id===$("reportSpring").value);reports.unshift({time:new Date().toLocaleString(),spring:s.id,location:s.location,condition:$("reportCondition").value,flow:Number($("reportFlow").value),officer:officer.name,note:$("reportNote").value,action:$("reportAction").value});closeReportModal();render("reports");alert("Current field report submitted successfully.")}
function downloadReport(title){const lines=[title,"SpringRevive AI Prototype",`Officer: ${officer.name}`,`Location: ${officer.location}`,`Generated: ${new Date().toLocaleString()}`,"",...springs.map(s=>`${s.id}, ${s.name}, ${s.location}, Flow=${s.flow} L/min, Risk=${s.risk}%, Priority=${s.priority}%, Status=${s.status}, Recharge=${s.recharge}`)];const blob=new Blob([lines.join("\n")],{type:"text/plain"});const a=document.createElement("a");a.href=URL.createObjectURL(blob);a.download=title.replaceAll(" ","_")+".txt";a.click();URL.revokeObjectURL(a.href)}

function toggleSpeak(){if(!window.speechSynthesis){showVoiceStatus("Speech synthesis is not supported in this browser.",false);return}if(window.speechSynthesis.speaking){window.speechSynthesis.cancel();showVoiceStatus(`🔊 ${t("voiceOff")}`,false)}else{speakCurrentPage()}}
function showVoiceStatus(text,listening=false){const s=$("voiceStatus");s.classList.remove("hidden");s.classList.toggle("listening",listening);s.textContent=text;clearTimeout(showVoiceStatus.timer);if(!listening)showVoiceStatus.timer=setTimeout(()=>s.classList.add("hidden"),5000)}
function speechLocale(){return lang==="ta"?"ta-IN":lang==="hi"?"hi-IN":"en-IN"}
function updateVoiceButton(){
  const b=$("voiceBtn"); if(!b)return;
  b.classList.toggle("active",voiceActive);
  b.setAttribute("aria-pressed",String(voiceActive));
  b.title=voiceActive?t("voiceOn"):t("voiceOff");
  const state=b.querySelector(".voice-state"); if(state)state.textContent=voiceActive?"ON":"OFF";
}
function stopVoiceRecognition(show=true){
  if(activeRecognition){try{activeRecognition.stop()}catch(e){} activeRecognition=null;}
  voiceActive=false; updateVoiceButton();
  if(show)showVoiceStatus(`🎙 ${t("voiceOff")}`,false);
}
function toggleVoiceRecognition(){
  if(voiceActive){stopVoiceRecognition(true);return;}
  startVoiceRecognition();
}
function startVoiceRecognition(){
  const SR=window.SpeechRecognition||window.webkitSpeechRecognition;
  if(!SR){showVoiceStatus(t("voiceUnsupported"),false);return}
  if(activeRecognition){try{activeRecognition.stop()}catch(e){}}
  const rec=new SR(); activeRecognition=rec; voiceActive=true; updateVoiceButton();
  rec.lang=speechLocale(); rec.interimResults=false; rec.maxAlternatives=1;
  showVoiceStatus(t("voiceListening"),true);
  rec.onresult=e=>{const phrase=e.results[0][0].transcript.toLowerCase();showVoiceStatus(`🎙 ${phrase}`,false);handleVoiceCommand(phrase)};
  rec.onerror=()=>{activeRecognition=null;voiceActive=false;updateVoiceButton();showVoiceStatus("Voice recognition stopped. Check microphone permission.",false)};
  rec.onend=()=>{activeRecognition=null;if(voiceActive){voiceActive=false;updateVoiceButton();if($('voiceStatus'))$('voiceStatus').classList.remove('listening');showVoiceStatus(t("voiceOff"),false)}};
  try{rec.start()}catch(e){activeRecognition=null;voiceActive=false;updateVoiceButton();showVoiceStatus(t("voiceOff"),false)}
}
function handleVoiceCommand(raw){const q=raw.toLowerCase();const commands=[
  {keys:["overview","dashboard","home","மேலோட்டம்","டாஷ்போர்டு","ओवरव्यू","डैशबोर्ड"],page:"dashboard"},
  {keys:["map","gis","satellite","வரைபடம்","gis வரைபடம்","मैप","मानचित्र"],page:"map"},
  {keys:["report","reports","அறிக்கை","அறிக்கைகள்","रिपोर्ट","रिपोर्ट्स"],page:"reports"},
  {keys:["monitoring","spring monitoring","ஊற்று கண்காணிப்பு","கண்காணிப்பு","मॉनिटरिंग"],page:"monitoring"},
  {keys:["rainfall","climate","மழை","காலநிலை","वर्षा","जलवायु"],page:"analytics"},
  {keys:["planning","recharge","திட்டமிடல்","நீர்ப்பிடிப்பு","योजना","रिचार्ज"],page:"recharge"},
  {keys:["alerts","alert","எச்சரிக்கை","எச்சரிக்கைகள்","अलर्ट"],page:"alerts"},
  {keys:["field app","field","கள செயலி","फील्ड ऐप"],page:"field"}
];const hit=commands.find(c=>c.keys.some(k=>q.includes(k)));if(hit){render(hit.page);return}if(q.includes("read")||q.includes("வாசி")||q.includes("पढ़")){speakCurrentPage();return}showVoiceStatus(`No matching command: ${raw}`,false)}
function speakCurrentPage(){if(!("speechSynthesis" in window)){showVoiceStatus("Speech synthesis is not supported in this browser.",false);return}const title=$("pageTitle").textContent;const summary=$("content").innerText.replace(/\s+/g," ").slice(0,750);const u=new SpeechSynthesisUtterance(`${title}. ${summary}`);u.lang=speechLocale();u.rate=.92;window.speechSynthesis.cancel();window.speechSynthesis.speak(u);showVoiceStatus(`🔊 ${t("readAloud")}`,false)}

applyLanguage();
loadSpringsFromBackend();
loadDashboardFromBackend();
loadAIPredictionFromBackend();
