<script lang="ts">
  import { onMount, onDestroy } from "svelte";

  let timeHour: number = 12;
  let timeMin: number = 0;
  let timeSec: number = 0;
  let dateYear: number = 0;
  let dateMon: number = 0;
  let dateDate: number = 0;
  let dateDay: number = 1;
  //   let dateDayStr: string = "";
  let interval: any;
  let t: Date;
  let name: string = "Northes";
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
      case 7:
        return "星期日";
      default:
        return "今天是周几？";
    }
  };

  $: ampmStr = () => {
    return timeHour < 12 ? "AM" : "PM";
  };
</script>

<div class="text-zinc-200 flex flex-col items-cneter text-2xl text-center">
  <div class="text-8xl">{beautifulStr(timeHour)}</div>
  <div class="font-thin">-</div>
  <div class="text-8xl">{beautifulStr(timeMin)}</div>
  <div class="font-thin">-</div>
  <div class="text-sm">{beautifulStr(timeSec)}</div>
  <div class="text-sm mt-5">
    <div>
      <span>{dateYear}</span>
      <span>{beautifulStr(dateMon)}</span>
      <span>{beautifulStr(dateDate)}</span>
    </div>
    <div>weather</div>
  </div>
  <div class="flex flex-col items-center mt-8">
    <div class="text-sm text-zinc-300">
      Hello,
      {#if editMod}
        <input type="text" bind:value={name} class="w-auto" />
      {:else}
        {name}
      {/if}
    </div>
    <div class="text-xs text-zinc-500">
      <p>{greetStr}</p>
      <div>-- {greetAuthor}</div>
    </div>
  </div>
</div>
