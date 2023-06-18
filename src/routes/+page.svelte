<script lang="ts">
  import { onMount, onDestroy } from "svelte";
  import { userName } from "$lib/stores";
  import { GetIPInfo, GetGeo, GetWeather } from "$api/weather";
  import type { weatherNow } from "$types/weather";

  let timeHour: number = 12;
  let timeMin: number = 0;
  let timeSec: number = 0;
  let dateYear: number = 0;
  let dateMon: number = 0;
  let dateDate: number = 0;
  let dateDay: number = 0;
  //   let dateDayStr: string = "";
  let interval: any;
  let t: Date;
  // let name: string = "Northes";
  let greetStr = "Nice to meet you";
  let greetAuthor = "Somebody";
  let editMod: boolean = false;

  onMount(() => {
    interval = setInterval(() => {
      t = new Date();
      timeHour = t.getHours();
      timeMin = t.getMinutes();
      timeSec = t.getSeconds();
      dateYear = t.getFullYear();
      dateMon = t.getMonth();
      dateDate = t.getDate();
      dateDay = t.getDay();
    });
  });

  onDestroy(() => {
    clearInterval(interval);
  });

  function beautifulStr(inNum: number): string | number {
    return inNum < 10 ? "0" + inNum : inNum;
  }

  $: dateDayStr = () => {
    switch (dateDay) {
      case 1:
        return "星期一";
      case 2:
        return "星期二";
      case 3:
        return "星期三";
      case 4:
        return "星期四";
      case 5:
        return "星期五";
      case 6:
        return "星期六";
      case 0:
        return "星期日";
      default:
        return "今天是周几？";
    }
  };

  $: ampmStr = () => {
    return timeHour < 12 ? "AM" : "PM";
  };

  let greetText: string = "Hello";
  $: getGreet(timeHour);
  function getGreet(hour) {
    // console.log("hour", hour,16 <= hour || hour < 5);
    switch (true) {
      case 5 <= hour && hour < 12:
        greetText = "Good Morning";
        break
      case 12 <= hour && hour < 16:
        greetText = "Good Afternoon";
        break
      case 16 <= hour || hour < 5:
        greetText = "Good Evening";
        break
      default:
        greetText = "Hello";
    }
    // console.log(greetText);
  }

  let weatherInfo: weatherNow = {
    temp: "",
    feels_like: "",
    text: "",
    humidity: "",
    precip: "",
    wind_dir: "",
  };

  function updateWeatherInfo() {
    console.log("update weather");
    // return;
    GetIPInfo().then((resp) => {
      // console.log("ip", resp.data);
      const data = resp.data;
      GetGeo(data.district, data.province).then((resp) => {
        // console.log("geo", resp);
        const geoData = resp.data;
        GetWeather(geoData.geo_id).then((resp) => {
          // console.log("weather", resp.data);
          weatherInfo = resp.data;
        });
      });
    });
  }

  let updateWeatherInterval: number;
  onMount(() => {
    // 立即更新
    updateWeatherInfo();
    // 每小时更新一次
    updateWeatherInterval = setInterval(updateWeatherInfo, 3600000);
  });
  onDestroy(() => {
    clearInterval(updateWeatherInterval);
  });

  let userNameInput;
  function editUserName() {
    editMod = true;
    setTimeout(() => {
      userNameInput.focus();
    }, 10);
  }
</script>

<div class="text-zinc-200 flex flex-col items-cneter text-center md:w-4/6">
  <div class="font-bold text-xs self-start hidden md:block">{ampmStr()}</div>

  <div
    class="md:flex md:items-center text-8xl md:text-9xl lg:text-10xl xl:text-12xl 2xl:text-13xl font-bold"
  >
    <div>{beautifulStr(timeHour)}</div>

    <div class="font-thin text-sm md:hidden">-</div>
    <div class="hidden md:block">·</div>

    <div>{beautifulStr(timeMin)}</div>

    <div class="font-thin text-sm md:hidden">-</div>
    <div class="hidden md:block">·</div>

    <div class="text-xl md:text-9xl lg:text-10xl xl:text-12xl 2xl:text-13xl">
      {beautifulStr(timeSec)}
    </div>
  </div>

  <div class="text-sm mt-5 md:flex md:flex-col md:items-start text-zinc-400">
    <div>
      <span>{dateYear}</span>
      <span>{beautifulStr(dateMon)}</span>
      <span>{beautifulStr(dateDate)}</span>
      <span> {dateDayStr()}</span>
    </div>

    <div class="text-sm">
      {#if parseInt(weatherInfo.temp) > 0}
        <span>
          {weatherInfo.temp}°C
        </span>
      {/if}
      {#if weatherInfo.text != "" && weatherInfo.wind_dir != ""}
        <span>
          {weatherInfo.text}-{weatherInfo.wind_dir}
        </span>
      {/if}
      {#if parseInt(weatherInfo.precip) > 0}
        <span>
          / {weatherInfo.precip}<span class="text-xs">mm</span>
        </span>
      {/if}
      {#if parseInt(weatherInfo.feels_like) > 0}
        <span>
          / {weatherInfo.feels_like}°C
        </span>
      {/if}
    </div>
  </div>

  <div class="flex flex-col items-center md:items-start mt-8">
    <div
      class="text-sm md:text-2xl text-zinc-300 mb-2"
      on:click={editUserName}
      on:keydown={editUserName}
    >
      {greetText},
      {#if editMod}
        <input
          type="text"
          bind:value={$userName}
          class="border-0 border-transparent border-none"
          on:blur={() => (editMod = false)}
          bind:this={userNameInput}
        />
      {:else}
        {$userName}
      {/if}
    </div>
    <div class="text-xs md:text-xl text-zinc-500">
      <div>{greetStr}</div>
      <div>-- {greetAuthor}</div>
    </div>
  </div>
</div>
