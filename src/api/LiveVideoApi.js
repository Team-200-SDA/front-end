const createRoom = async () => {
  const response = await fetch('https://api.daily.co/v1/rooms/edulane', {
    method: 'GET',
    headers: {
      Authorization:
        'Bearer 606692026bd406710ed3b9eebf8dcfde837d259a43a72a6c25dcbb4e19b6ff2'
    }
  });
  const room = await response.json();
  return room;
};

export default createRoom;
