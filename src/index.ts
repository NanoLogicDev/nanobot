import DiscordService from "./services/DiscordService";

class Application {
    private _discordService: DiscordService;

    constructor() {
        this._discordService = new DiscordService();
    }

    public init(): void {
        this._discordService.init();
    }
}

const application: Application = new Application();

application.init();