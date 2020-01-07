import { writable } from "svelte/store"
import Bela from '../lib/Bela/Bela.js'

const createBela = () => {

    let bela = {}

    let state = {
        connected: false,
        ip: '192.168.7.2',
        interval: 500
    }

    const { subscribe, set, update } = writable(state)

    const methods = {
        setup: (_ip, _onControl) => {
        	let ip
        	update (s => {
        		if (_ip != null) s.ip = _ip
        		ip = s.ip
				return s
        	})
        	bela = new Bela(ip)
        	if (_onControl != null) methods.onControl = _onControl
			bela.control.target.addEventListener('custom', function(event){
				methods.onControl(event)
			})
        	methods.monitor(bela)
        },
        monitor: (b) => {
        	let interval
        	update (s => { interval = s.interval; return s })
			setInterval(function() {
				if (b.isConnected() && !methods.connected())
					update(s => { s.connected = true;  return s} )
				if (!b.isConnected() && methods.connected())
					update(s => { s.connected = false; return s} )
			}, interval)
        },
        connected: () => {
        	let connected
        	update (s=> { connected = s.connected; return s })
        	return connected
        },
        sendControl: (msg) => {
        	if (bela.isConnected()) bela.control.send(msg)
        },
    	sendData: (msg) => {
    		if (bela.isConnected()) bela.data.send(msg)
    	},
	    onControl: (event) => {
	    	console.log('[BelaStore] received event:', event.detail)
	    },
        reset: () => {
        	bela = {}
            return set(state)
        }
    }

    return {
        subscribe,
        set,
        update,
        ...methods
    }
}

export const BelaStore = createBela()
