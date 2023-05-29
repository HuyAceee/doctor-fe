import EventEmitter from "events";

const _emitter = new EventEmitter();
_emitter.setMaxListeners(0);

export const emiiter = _emitter;

// _emitter.emit(emit_name, data);
// _emitter.on(emit_name, data => {
//     //actions
// });