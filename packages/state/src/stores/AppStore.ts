import { CommandEditorStore } from "./CommandEditorStore";
import { EditorInterfaceStore } from "./EditorInterfaceStore";
import { EditorSelectPlanStore } from "./EditorSelectPlanStore";
import { EditorSelectProjectStore } from "./EditorSelectProjectStore";
import { HotkeyStore } from "./HotkeyStore";
import { ImageLibraryStore } from "./ImageLibraryStore";
import { Loading } from "./Loading";
import { SharedEventBus } from "./SharedEventBus";
import { UpdateStateSocketStore } from "./UpdateStateSocketStore";
import { ViewerInterfaceStore } from "./ViewerInterfaceStore";
import { ViewerSelectPlanStore } from "./ViewerSelectPlanStore";
import { ViewerSelectProjectStore } from "./ViewerSelectProjectStore";

export class AppStore {
    icon: ImageLibraryStore;
    viewerInterface: ViewerInterfaceStore;
    viewerSelectProject: ViewerSelectProjectStore;
    viewerSelectPlan: ViewerSelectPlanStore;
    loading: Loading;
    editorInterface: EditorInterfaceStore;
    editorSelectProject: EditorSelectProjectStore;
    editorSelectPlan: EditorSelectPlanStore;
    commandEditor: CommandEditorStore;
    sharedEventBus: SharedEventBus;
    hotkey: HotkeyStore;
    updateStateSocket: UpdateStateSocketStore;

    constructor() {
        this.viewerSelectProject = new ViewerSelectProjectStore(this);
        this.viewerSelectPlan = new ViewerSelectPlanStore(this);
        this.loading = new Loading(this);
        this.icon = new ImageLibraryStore(this);
        this.commandEditor = new CommandEditorStore(this);
        this.sharedEventBus = new SharedEventBus(this);
        this.hotkey = new HotkeyStore(this);
        this.viewerInterface = new ViewerInterfaceStore(this);
        this.updateStateSocket = new UpdateStateSocketStore(this);
        this.editorSelectProject = new EditorSelectProjectStore(this);
        this.editorSelectPlan = new EditorSelectPlanStore(this);
        this.editorInterface = new EditorInterfaceStore(this);
    }
}
