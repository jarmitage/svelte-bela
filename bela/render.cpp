#include <Bela.h>
#include <libraries/Gui/Gui.h>

Gui gui;

void sendToGui(){
	JSONObject root;
	root[L"test"] = new JSONValue (0);
	JSONValue* value = new JSONValue (root);
	gui->sendControl(value);
	rt_printf("send value: %d\n", 0);
}

void onControl (JSONObject root) {
	std::wstring cmd;
	rt_printf("Command received\n");
	sendToGui();
}

bool setup (BelaContext *context, void *userData) {

    gui.setup(context->projectName);
    gui.setControlDataCallback([this](JSONObject& root, void* customData)->bool {
      onControl(root);
      return true;
    });

    return true;
}

void render (BelaContext *context, void *userData) {
	for (int n = 0; n < context->audioFrames; ++n) {
	}
}

void cleanup (BelaContext *context, void *userData){}
