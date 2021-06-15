import { Context } from "../index";
import { checkIsLoggedIn, checkIsContainerOwner } from "../utils";

interface Args {
	id: string;
}

const deleteContainer = async (_: any, args: Args, context: Context, info: any) => {
	await checkIsLoggedIn(context);
	await checkIsContainerOwner(context, args.id);
	const containers = await context.docker.container.list({ all: true });
	const container = containers.filter((container) => container.id === args.id)[0];
	container.delete({ force: true });
	return true;
};

export default deleteContainer;
