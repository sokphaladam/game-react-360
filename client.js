// This file contains the boilerplate to execute your React app.
// If you want to modify your application's content, start in "index.js"

import {ReactInstance, Location, Surface} from 'react-360-web';

function init(bundle, parent, options = {}) {
  const r360 = new ReactInstance(bundle, parent, {
    // Add custom options here
    fullScreen: true,
    ...options,
  });

  const LOCATION = new Location([0,0,0]);
  const SURFACE = new Surface(1000, 600, Surface.SurfaceShape.Flat)

  SURFACE.setAngle(1.5, 0 ,0)

  r360.renderToLocation(
    r360.createRoot('game360', {}),
    LOCATION
  )

  r360.renderToSurface(
    r360.createRoot('Menu', {}),
    SURFACE
  )

  r360.runtime.executor._worker.addEventListener('message', (e) => onMessage(e, r360))

  // Load the initial environment
  // r360.compositor.setBackground(r360.getAssetURL('4.jpg'));
}

window.React360 = {init};

function onMessage(e, r360) {
  if(e.data.type === 'bg') {
    r360.compositor.setBackground(r360.getAssetURL(`${e.data.image}.jpg`));
  }

  if(e.data.type === 'score') {
    r360.runtime.context.callFunction('RCTDeviceEventEmitter', 'emit', ['clickedObj', { score: e.data.score }])
  }

  if(e.data.type === 'game') {
    r360.runtime.context.callFunction('RCTDeviceEventEmitter', 'emit', ['game', { status: e.data.status }])
  }
}