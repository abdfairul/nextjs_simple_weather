import styles from "../styles/Home.module.css";
import WeatherComponent from "../components/weather-component"
import RouteProtectComponent from '../components/route-protect-component';

export default function Home() {
  return (
  <div className={styles.container}>
    <RouteProtectComponent>
      <WeatherComponent/>
    </RouteProtectComponent>
  </div>
  );
}