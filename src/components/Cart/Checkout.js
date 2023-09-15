import classes from "./Checkout.module.css";
import { useRef, useState } from "react";
const Checkout = (props) => {
	const isEmpty = (value) => value.trim() === "";

	const isFiveChars = (value) => value.trim().length === 5;
	const [formInputsValidity, setFormInputsValidity] = useState({
		name: true,
		street: true,
		postal: true,
		cityInput: true,
	});
	const nameInput = useRef();
	const streetInput = useRef();
	const postalInput = useRef();
	const cityInput = useRef();

	const confirmHandler = (event) => {
		event.preventDefault();

		const enteredName = nameInput.current.value;
		const enteredStreet = streetInput.current.value;
		const enteredPostal = postalInput.current.value;
		const enteredCity = cityInput.current.value;

		const enteredNameIsValid = !isEmpty(enteredName);
		const enteredStreetIsValid = !isEmpty(enteredStreet);
		const enteredPostalIsValid = isFiveChars(enteredPostal);
		const enteredCityIsValid = !isEmpty(enteredCity);

		setFormInputsValidity({
			name: enteredNameIsValid,
			street: enteredStreetIsValid,
			postal: enteredPostalIsValid,
			city: enteredCityIsValid,
		});
		const formIsValid =
			enteredNameIsValid &&
			enteredStreetIsValid &&
			enteredPostalIsValid &&
			enteredCityIsValid;

		if (!formIsValid) {
			return;
		}
	};

	return (
		<form
			className={classes.form}
			onSubmit={confirmHandler}>
			<div
				className={`${classes.control} ${
					formInputsValidity.name ? "" : classes.invalid
				}`}>
				<label htmlFor='name'>Your Name</label>
				<input
					type='text'
					id='name'
					ref={nameInput}
				/>
				{!formInputsValidity.name && <p>Please Enter A Valid Name!</p>}
			</div>
			<div
				className={`${classes.control} ${
					formInputsValidity.street ? "" : classes.invalid
				}`}>
				<label htmlFor='street'>Street</label>
				<input
					type='text'
					id='street'
					ref={streetInput}
				/>
				{!formInputsValidity.street && <p>please Enter A Valid Street!</p>}
			</div>
			<div
				className={`${classes.control} ${
					formInputsValidity.postal ? "" : classes.invalid
				}`}>
				<label htmlFor='postal'>Postal Code</label>
				<input
					type='text'
					id='postal'
					ref={postalInput}
				/>
				{!formInputsValidity.postal && <p>Please Enter A Valid Postal Code!</p>}
			</div>
			<div
				className={`${classes.control} ${
					formInputsValidity.city ? "" : classes.invalid
				}`}>
				<label htmlFor='city'>City</label>
				<input
					type='text'
					id='city'
					ref={cityInput}
				/>
				{!formInputsValidity.city && <p>Please Enter A Valid City!</p>}
			</div>
			<div className={classes.actions}>
				<button
					type='button'
					onClick={props.onCancel}>
					Cancel
				</button>
				<button className={classes.submit}>Confirm</button>
			</div>
		</form>
	);
};

export default Checkout;
