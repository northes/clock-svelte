<script lang="ts">
  import { GetIPInfo, GetGeo, GetWeather } from "$api/weather";
  import { onMount } from "svelte";
  import type { weatherNow } from "$types/types";

  let weatherInfo: weatherNow = {
    temp: "25",
    feels_like: "28",
    text: "雨",
    humidity: "95",
    precip: "11.8",
    wind_dir: "北风",
  };

  onMount(() => {
    return;
    GetIPInfo().then((resp) => {
      console.log("ip", resp.data);
      const data = resp.data;
      GetGeo(data.district, data.province).then((resp) => {
        console.log("geo", resp);
        const geoData = resp.data;
        GetWeather(geoData.geo_id).then((resp) => {
          console.log("weather", resp.data);
          weatherInfo = resp.data;
        });
      });
    });
  });
</script>

<div class="text-gray-200 text-sm">
  <span>
    {weatherInfo.temp}°C
  </span>
  <span>
    {weatherInfo.text}-{weatherInfo.wind_dir}
  </span>
  {#if parseInt(weatherInfo.precip) > 0}
    <span>
      💧{weatherInfo.precip}
    </span>
  {/if}
  <span>
    🤒{weatherInfo.feels_like}°C
  </span>
</div>
