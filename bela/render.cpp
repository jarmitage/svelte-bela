#include <Bela.h>
#include <libraries/Gui/Gui.h>

Gui gui;

void onControl (JSONObject root) {
	std::wstring cmd;
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
