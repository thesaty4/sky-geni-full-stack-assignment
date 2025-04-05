function sortQuarters(data: any[]): any[] {
  return data.sort((a, b) => {
    const [yearA, quarterA] = a.quarter.match(/\d+/g)!.map(Number);
    const [yearB, quarterB] = b.quarter.match(/\d+/g)!.map(Number);

    return yearA !== yearB ? yearA - yearB : quarterA - quarterB;
  });
}
