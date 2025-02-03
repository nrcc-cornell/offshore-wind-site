export async function load({ fetch }) {
  async function fetchFile(dataName: string) {
    const response = await fetch('/api/get-file', {
      method: 'POST',
      body: JSON.stringify({ key: `${dataName}_results.json` })
    });
    const results = await response.json();
    return { [dataName]: results };
  }

  const fetchResults = await Promise.all([
    fetchFile('noaa'),
    fetchFile('era5')
  ]);

  return fetchResults.reduce((prev, curr) => ({...prev, ...curr}) , {});
};