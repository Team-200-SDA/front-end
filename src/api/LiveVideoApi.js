const createRoom = async () => {
  const response = await fetch(process.env.REACT_APP_DAILY_API, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_DAILY_TOKEN}`
    }
  });
  const room = await response.json();
  return room;
};

export default createRoom;
