CREATE TABLE climate(
	id INT NOT NULL,
	country VARCHAR(25) NOT NULL,
	average_temp DECIMAL,
	renewable_energy_share_percentage DECIMAL,
	electricity_from_fossil_fuels_TWh DECIMAL,
	electricity_from_nuclear_TWh DECIMAL,
	electricity_from_renewables_TWh DECIMAL,
	low_carbon_electricity_ DECIMAL, 
	primary_energy_consumption_kWh_per_person DECIMAL,
	co2_emissions_metric_tons_per_capita DECIMAL,
	GDP_per_capita DECIMAL,
	land_area_Km2 DECIMAL,
	latitude DECIMAL,
	longitude DECIMAL,
	population DECIMAL,
	renewable_energy_consumption_kWh_per_person DECIMAL,
	PRIMARY KEY (country)
);