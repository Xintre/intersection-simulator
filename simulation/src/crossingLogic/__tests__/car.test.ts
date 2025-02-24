import Car from '../Car';
import Direction from '../direction';

describe('Car', () => {
	it('properly assigns car values in constructor', () => {
		const carId = 'vehicle1';
		const startDirection = Direction.N;
		const destinationDirection = Direction.E;

		const car = new Car(carId, startDirection, destinationDirection);

		expect(car.carID).toEqual(carId);
		expect(car.start).toEqual(startDirection);
		expect(car.destination).toEqual(destinationDirection);
		expect(car.roundCt).toEqual(0);
	});
});
