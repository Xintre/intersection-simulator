import {
	CrossingConnectAhead,
	IO,
	Intersection,
	MostCarsWinSwitchingStrategy,
	SimulationEnd,
} from '../crossingLogic';

import express from 'express';
import helmet from 'helmet';
import { processCommand } from '../shared';

const app = express();
const port = 8000;

let intersection = new Intersection(
	CrossingConnectAhead,
	MostCarsWinSwitchingStrategy
);

app.use(helmet());
app.use(express.json());

app.get('/', (_req, res) => {
	res.send("🚦 This is Xintre's Crossroads Simulation API 🚦");
});

app.get('/api/state', (req, res) => {
	console.log(`Sending current state to client ${req.ip}`);

	res.send(intersection.getState());
});

app.post(
	'/api/command',
	(
		req: express.Request<
			{},
			ReturnType<Intersection['getState']>,
			IO.AllCommands
		>,
		res
	) => {
		console.log(
			`Client ${req.ip} executed command of type: ${req.body.type}`
		);

		try {
			processCommand(intersection, req.body);
		} catch (e: unknown) {
			if (e instanceof SimulationEnd) {
				// silence the error - we want to run forever in this mode
			} else {
				// make other errors happen
				throw e;
			}
		}

		// respond with current state so that client does not have to do another call to /api/state
		res.send(intersection.getState());
	}
);

app.listen(port, () => {
	console.log(
		`Xintre's Crossroads Simulation API listening on http://localhost:${port}`
	);
});
