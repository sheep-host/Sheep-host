function populateNewDB() {

  const images = [
  'http://4.bp.blogspot.com/-_qm9BNdFzrE/UNhmPr4b8gI/AAAAAAAABQc/QzS_2oDGYmQ/s640/HaGiang2.jpg',
  'http://1.bp.blogspot.com/-8rdWz3hAw1A/UjHKq5Hn92I/AAAAAAAAHXU/52Vj1XrZd38/s1600/Beautiful-Scenery-And-Colourful-Landscapes-2.jpg',
  'https://pixabay.com/static/uploads/photo/2015/03/28/16/40/lake-696098_960_720.jpg',
  'http://coverjunction.s3.amazonaws.com/manual/low/scenery5.jpg',
  'http://cdn.wallpapersafari.com/30/21/lriKTt.jpg',
  'http://www.hungamalive.com/wp-content/uploads/2015/08/Scenery-HD-6.jpg',
  'http://www.gawlerrangessafaris.com/wp-content/uploads/2013/04/scenery-photo10.jpg',
  'https://s-media-cache-ak0.pinimg.com/564x/71/ec/89/71ec89208756f3ba802787105516897d.jpg',
  'https://image.winudf.com/27/1f8dd2eb12dd2b/screen-6.jpg',
  'http://www.yokoso-japan.jp/_tourimg/05523_1.jpg',
  'http://courant.chictrib.netdna-cdn.com/media/catalog/product/cache/6/image/9df78eab33525d08d6e5fb8d27136e95/s/u/sunset_fishing.jpg',
  'https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQae6IcjVq9LXLd4QWieoM4N2nQPsWkltUy-nrIGaroeZy4CAqb5w',
  'http://image.shutterstock.com/display_pic_with_logo/348181/134111978/stock-photo-scenic-summer-scenery-of-the-old-town-in-stockholm-sweden-134111978.jpg',
  'http://www.chinadaily.com.cn/travel/img/attachement/jpg/site1/20140904/002564bc654b157246001e.jpg',
  'http://www.kingsizetheme.com/wp-content/uploads/2015/11/6224049770_5d353af67c_b.jpg',
  'http://news.xinhuanet.com/english/photo/2015-03/29/134107161_14276161288361n.jpg'
  ];

  const captions = [
    'Scene1',
    'Scene2',
    'Scene3',
    'Scene4',
    'Scene5',
    'Scene6',
    'Scene7',
    'Scene8',
    'Scene9',
    'Scene10',
    'Scene11',
    'Scene12',
    'Scene13',
    'Scene14',
    'Scene15',
    'Scene16'
  ];

  for (let i = 0; i < images.length; i++) {
    sheep.post(dbName, colName, { caption: captions[i], image: images[i] });
  }
}
