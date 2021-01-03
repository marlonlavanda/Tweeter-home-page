<template>
  <div id="app" class="flex container h-screen w-ful">
    <!-- side bar -->
    <div class="lg:w-1/5 border-r border-lighter lg:px-6 g:px-8 py-2  flex flex-col justify-between">
      <div>
        <button class="h-12 w-12 hover:bg-lightblue text-3xl rounded-full text-blue">
        <i class="fab fa-twitter"></i>
        </button>
    
        <div>
          <button v-for="tab in tabs" 
            :key="`${tab.icon}`"
            @click="id = tab.id"
            :class="`focus:outline-none hover:text-blue flex items-center py-2 px-4 hover:bg-lightblue rounded-full mr-auto mb-3 ${ id === tab.id ? 'text-blue' : ''}`">
            <i :class="`${ tab.icon } text-2xl mr-4 text-left`"></i>
            <p class="text-lg font-semibold text-left hidden lg:block"> {{tab.title}}</p>
          </button>
        </div>

        <button class="text-white bg-blue rounded-full font-semibold focus:outline-none w-12 h-12 lg:h-auto lg:w-full p-3 hover:bg-darkblue">
          <p class="hidden lg:block">Tweet</p>
          <i class="fas fa-plus lg:hidden"></i>
        </button>
      </div>
      <div class="lg:w-full relative">
        <button 
        @click="dropdown = true"
        class="flex items-center w-full hover:bg-lightblue rounded-full p-2 focus:outline-none">
          <img src="https://avatars3.githubusercontent.com/u/65986500?s=460&u=26f692c9dd72a99900f8c6af16fa16383eb8e29a&v=4" 
          class="w-10 h-10 rounded-full border border-lighter">
          <div class="hidden lg:block ml-4">
            <p class="text-sm font-bold leading-tight">Marlon Lavanda</p>
            <p class="text-sm leading-tight">@lavanda-marlon</p>
          </div>
          <i class="hidden lg:block fas fa-angle-down ml-auto text-lg"></i>
        </button>
        <div 
        v-if="dropdown === true"
        class="absolute bottom-0 left-0 w-64 rounded-lg shadow-md border-lightest bg-white mb-16">
          <button 
          @click="dropdown = false"
          class="p-3 flex items-center w-full hover:bg-lightest  p-2 focus:outline-none">
          <img src="https://avatars3.githubusercontent.com/u/65986500?s=460&u=26f692c9dd72a99900f8c6af16fa16383eb8e29a&v=4" 
          class="w-10 h-10 rounded-full border border-lightest">
          <div class="ml-14">
            <p class="text-sm font-bold leading-tight">Marlon Lavanda</p>
            <p class="text-sm leading-tight">@lavanda-marlon</p>
          </div>
          <i class="fas fa-check ml-auto text-blue"></i>
        </button>
        <button 
        @click="dropdown = false"
        class="w-full text-left hover:bg-lightest border-t border-lighter p-3 text-sm">
          Add an existing account
        </button>
        <button 
        @click="dropdown = false"
        class="w-full text-left hover:bg-lightest border-t border-lighter p-3 text-sm">
          Log out @lavanda-marlon
        </button>
        </div>
      </div>
    </div>
    <!-- tweet section  -->
    <div class=" w-full md:w-1/2 h-full overflow-y-scroll">
    <div class="px-5 py-3 border-b border-lighter flex items-center justify-between">
      <h1 class="text-xl font-bold">Home</h1>
      <i class="far fa-star text-xl text-blue"></i>
    </div>
      <div class="px-5 py-3 border-b-8 border-lighter flex">
        <div class="flex-none">
          <img src="https://avatars3.githubusercontent.com/u/65986500?s=460&u=26f692c9dd72a99900f8c6af16fa16383eb8e29a&v=4"
          class="flex-none w-12 h-12 rounded-full border border-lighter" />
        </div>
        <form v-on:submit.prevent = "addNewTweet"
        class="w-full px-4 relative">
          <textarea v-model="tweet.content"
          placeholder="What's up?"
          class="mt-3 pb-3 w-full focus:outline-none border-none" />
          <div class="flex items-center">
            <i class="far fa-image text-lg text-blue mr-4"></i>
            <i class="fas fa-film text-lg text-blue mr-4"></i>
            <i class="far fa-chart-bar text-lg text-blue mr-4"></i>
            <i class="far fa-smile text-lg text-blue mr-4"></i>
          </div>
          <button type="submit"
          class="h-10 px-4 text-white font-semibold bg-blue hover:bg-darkblue focus:outline-none rounded-full absolute bottom-0 right-0">
            Tweet
          </button>
        </form>
      </div>
      
      <div class="flex flex-col-reverse">
        <div 
        v-for="tweet in tweets" 
        :key="tweet.content"
        class="w-full p-4 border-b hover:bg-lighter flex">
          <div class="flex-none mr-4">
            <img src="https://avatars3.githubusercontent.com/u/65986500?s=460&u=26f692c9dd72a99900f8c6af16fa16383eb8e29a&v=4" 
            class="h-12 w-12 rounded-full flex-none"/>
          </div>
          <div class="w-full">
            <div class="flex items-center w-full">
              <p class="font-semibold"> Marlon Lavanda </p>
              <p class="text-sm text-dark ml-2"> @lavanda-marlon </p>
              <p class="text-sm text-dark ml-2"> 1 sec </p>
              <i class="fas fa-angle-down text-dark ml-auto"></i>
            </div>
            <p class="py-2">
              {{ tweet.content }}
            </p>
            <div class="flex items-center justify-between w-full">
              <div class="flex items-center text-sm text-dark">
                <i class="far fa-comment mr-3"></i>
                <p> 0 </p>
              </div>
              <div class="flex items-center text-sm text-dark">
                <i class="fas fa-retweet mr-3"></i>
                <p> 0 </p>
              </div>
              <div class="flex items-center text-sm text-dark">
                <i class="fas fa-heart mr-3"></i>
                <p> 1 </p>
              </div>
              <div class="flex items-center text-sm text-dark">
                <i class="fas fa-share-square mr-3"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-for="follow in following"
      :key="`${follow.name}`"
      class="w-full p-4 border-b hover:bg-lighter flex">
        <div class="flex-none mr-4">
          <img :src="`${follow.src}`" class="h-12 w-12 rounded-full flex-none">
        </div>
        <div class="w-full ">
          <div class="flex items-center w-full">
            <p class="font-semibold">{{follow.name}}</p>
            <p class="text-sm text-dark ml-2">{{follow.handle}}</p>
            <p class="text-sm text-dark ml-2">{{follow.time}}</p>
            <i class="fas fa-angle-down text-dark ml-auto"></i>
          </div>
          <p class="py-2">
            {{follow.tweet}}
          </p>
          <div class="flex items-center justify-between w-full">
            <div class="flex items-center text-sm text-dark">
              <i class="far fa-comment mr-3"></i>
              <p>{{follow.comments}}</p>
            </div>
            <div class="flex items-center text-sm text-dark">
              <i class="fas fa-retweet mr-3"></i>
              <p>{{follow.retweets}}</p>
            </div>
            <div class="flex items-center text-sm text-dark">
              <i class="fas fa-heart mr-3"></i>
              <p>{{follow.likes}}</p>
            </div>
            <div class="flex items-center text-sm text-dark">
              <i class="fas fa-share-square mr-3"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- trending section   -->
    <div class="md:block hidden w-1/3 h-full border-l border-lighter py-2 px-6 overflow-y-scroll relative">
        <input 
        class="pl-12 rounded-full w-full p-2 bg-lighter text-sm mb-4" placeholder="Search Twitter" />
        <i class="fas fa-search absolute left-0 top-0 mt-5 ml-12 text-sm text-light"></i>
        <div class="w-full rounded-lg bg-lightest">
          <div class="flex items-center justify-betweem p-3">
            <p class="text-lg font-bold">Trend for You</p>
            <i class="fas fa-cog text-lg text-blue ml-2"></i>
          </div>
          <button 
          v-for="trend in trending"
          :key="`${trend.top}`"
          class="w-full flex justify-between hover:bg-lighter p-3 border-t border-lighter">
            <div>
              <p class="text-sm text-left leading-tight text-dark">{{trend.top}}</p>
              <p class="font-bold text-left leading-tight">{{trend.title}}</p>
              <p class="text-left leading-tight text-dark">{{trend.bottom}}</p>
            </div>
            <i class="fas fa-angle-down text.lg text-dark"></i>
          </button>
          <button class="p-3 w-full hover:bg-lighter text-left text-blue border-t border-lighter">
            Show More
          </button>
        </div>

        <div class="w-full rounded-lg bg-lightest my-4">
          <div class="p-3">
            <p class="text-lg font-bold">Who to follow</p>
          </div>
          <button
          v-for="friend in friends" 
          :key="friend.name"
          class="w-full flex hover:bg-lighter p-3 border-t border-lighter">
            <img :src="`${friend.src}`" 
          class="w-12 h-12 rounded-full border border-lighter">
          <div class="hidden lg:block ml-4">
            <p class="text-sm font-bold leading-tight">{{friend.name}}</p>
            <p class="text-sm leading-tight">{{friend.hundle}}</p>
          </div>
          <button class="ml-auto text-sm text-blue py-1 px-4 rounded-full border-2 border-blue">
            Follow
          </button>
          </button>
          <button class="p-3 w-full hover:bg-lighter text-left text-blue border-t border-lighter">
            Show More
          </button>
        </div>
    </div>
  </div>
</template>
<i class="fas fa-hashtag"></i><script>
// import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld
  },
  data () {
    return {
      tabs: [
        {icon: 'fas fa-home', title: 'Home', id:'home'},
        {icon: 'fas fa-hashtag', title: 'Explore', id:'explore'},
        {icon: 'fas fa-bell', title: 'Notifications', id:'notifications'},
        {icon: 'fas fa-envelope', title: 'Message', id:'message'},
        {icon: 'fas fa-bookmark', title: 'Bookmarks', id:'bookmarks'},
        {icon: 'fas fa-clipboard-list', title: 'Lists', id:'lists'},
        {icon: 'fas fa-user', title: 'Profile', id:'profile'},
        {icon: 'fas fa-ellipsis-h', title: 'More', id:'more'},
      ],
      id: 'home',
      dropdown: false,
      trending: [
        {top: 'Trending in UK', tilte: 'Gigi', botttom: 'Trending with: Rip Gigi'},
        {top: 'Music', tilte: 'We mom', botttom: '135k tweets'},
        {top: 'Pop', tilte: 'Blue Ivy', botttom: '40k tweets'},
        {top: 'Trending in Spain', tilte: 'Denim day', botttom: '40k tweets'},
        {top: 'Trending', tilte: 'When Beyonce', botttom: '24.4k tweets'},
      ],
      friends: [
        {src: 'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f47d4de7637290765bce495%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D1398%26cropX2%3D3908%26cropY1%3D594%26cropY2%3D3102', name: 'Elon Musk', hundle: '@teslaboy'},

        {src: 'https://specials-images.forbesimg.com/imageserve/5f58ee3ad1ca7c34c4608d3f/960x0.jpg?fit=scale', name: 'Leo Messi', hundle: '@leo_messi'},

        {src: 'https://img.bleacherreport.net/img/images/photos/003/896/355/hi-res-d45ea2c1a64a3715ca7016d7b8f87962_crop_north.jpg?1608193031&w=3072&h=2048', name: 'El Canelo', hundle: '@canelo'},
      ],
      following: [
        {src: 'https://thumbor.forbes.com/thumbor/fit-in/416x416/filters%3Aformat%28jpg%29/https%3A%2F%2Fspecials-images.forbesimg.com%2Fimageserve%2F5f47d4de7637290765bce495%2F0x0.jpg%3Fbackground%3D000000%26cropX1%3D1398%26cropX2%3D3908%26cropY1%3D594%26cropY2%3D3102', name: 'Elon Musk', handle: '@teslaboy', time: '20 min', tweet: 'Should I just quarantine on mars?', comments: '1k', retweets: '550', likes: '1.2M'},

        {src: 'https://specials-images.forbesimg.com/imageserve/5f58ee3ad1ca7c34c4608d3f/960x0.jpg?fit=scale', name: 'Leo Messi', handle: '@leo_messi', time: '20 min', tweet: 'Confirmen chic@s de Argentina, todo piola?', comments: '2k', retweets: '10k', likes: '10M'},

        {src: 'https://img.bleacherreport.net/img/images/photos/003/896/355/hi-res-d45ea2c1a64a3715ca7016d7b8f87962_crop_north.jpg?1608193031&w=3072&h=2048', name: 'El Canelo', handle: '@canelo', time: '20 min', tweet: 'Que viva México cabrones!', comments: '3k', retweets: '30k', likes: '3M'},
      ],
      tweets: [
        { content: 'Building a tweeter clone with Vue.js and Tailwind!'}
      ],
      tweet: {content: ''}
    }
  },
  methods: {
    addNewTweet () {
      let newTweet =  {
        content: this.tweet.content
      };
      this.tweets.push(newTweet)
    }
  }
}
</script>

<style src="./assets/tailwind.css" />
