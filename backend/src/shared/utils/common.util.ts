export function sortQuarters(data: any[]): any[] {
  return data.sort((a, b) => {
    const [yearA, quarterA] = a.quarter.match(/\d+/g)!.map(Number);
    const [yearB, quarterB] = b.quarter.match(/\d+/g)!.map(Number);

    return yearA !== yearB ? yearA - yearB : quarterA - quarterB;
  });
}

export function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
