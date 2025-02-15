import logo from "../assets/logo.svg";
import { ArrowRight } from "lucide-react";

const Header = () => {
	return (
		<header>
			<div>
				<img src={logo} alt="logo" className="logo" />
			</div>

			<div className="nav">
				<ul>
					<li>
						<a href="#">Events</a>
					</li>

					<li>
						<a href="#">My Tickets</a>
					</li>

					<li>
						<a href="#">About Project</a>
					</li>
				</ul>
			</div>

			<div>
				<button className="header__btn">
					my tickets
					<ArrowRight className="btn__icon" />
				</button>
			</div>
		</header>
	)
}

export default Header