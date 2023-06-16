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

<div class="w-10/12 text-zinc-200">
  <div class="font-bold text-xs">{ampmStr()}</div>

  <div
    class="flex justify-center font-bold text-16xl sm:text-9xl md:text-10xl lg:text-11xl xl:text-12xl 2xl:text-13xl"
  >
    <div class="w-full">
      {beautifulStr(timeHour)}·{beautifulStr(timeMin)}·{beautifulStr(timeSec)}
    </div>
  </div>

  <div class="text-zinc-400 text-sm">
    <div class="flex gap-6">
      <div>
        <span>{dateYear}</span>
        <span>{beautifulStr(dateMon)}</span>
        <span>{beautifulStr(dateDate)}</span>
      </div>
      <div>
        {dateDayStr()}
      </div>
    </div>

    <div class="flex">
      <div>weather</div>
    </div>
  </div>

  <div class="mt-16">
    <div class="text-zinc-300">
      Hello,<input type="text" bind:value={name} />
    </div>
    <div class="text text-zinc-500">
      <p>{greetStr}</p>
      <div>-- {greetAuthor}</div>
    </div>
  </div>
</div>
