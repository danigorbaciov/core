import { app } from "@arkecosystem/core-container";
import { flags } from "@oclif/command";
import { CommandFlags } from "../../types";
import { BaseCommand } from "../command";

export class RunCommand extends BaseCommand {
    public static description: string = "Run the relay (without pm2)";

    public static examples: string[] = [
        `Run a relay
$ qredit relay:run
`,
        `Run a genesis relay
$ qredit relay:run --networkStart
`,
        `Disable any discovery by other peers
$ qredit relay:run --disableDiscovery
`,
        `Skip the initial discovery
$ qredit relay:run --skipDiscovery
`,
        `Ignore the minimum network reach
$ qredit relay:run --ignoreMinimumNetworkReach
`,
        `Start a seed
$ qredit relay:run --launchMode=seed
`,
    ];

    public static flags: CommandFlags = {
        ...BaseCommand.flagsNetwork,
        ...BaseCommand.flagsBehaviour,
        suffix: flags.string({
            hidden: true,
            default: "relay",
        }),
        env: flags.string({
            default: "production",
        }),
    };

    public async run(): Promise<void> {
        const { flags } = await this.parseWithNetwork(RunCommand);

        await super.buildApplication(app, flags, {
            exclude: ["@arkecosystem/core-forger"],
            options: {
                "@arkecosystem/core-p2p": this.buildPeerOptions(flags),
                "@arkecosystem/core-blockchain": {
                    networkStart: flags.networkStart,
                },
            },
        });
    }
}
