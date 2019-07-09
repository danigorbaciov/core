import { flags } from "@oclif/command";
import { AbstractStopCommand } from "../../shared/stop";
import { CommandFlags } from "../../types";
import { BaseCommand } from "../command";

export class StopCommand extends AbstractStopCommand {
    public static description: string = "Stop the relay";

    public static examples: string[] = [
        `Stop the relay
$ qredit relay:stop
`,
        `Stop the relay daemon
$ qredit relay:stop --daemon
`,
    ];

    public static flags: CommandFlags = {
        ...BaseCommand.flagsNetwork,
        daemon: flags.boolean({
            description: "stop the process or daemon",
        }),
    };

    public getClass() {
        return StopCommand;
    }

    public getSuffix(): string {
        return "relay";
    }
}
