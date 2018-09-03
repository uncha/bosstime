import Vue from 'vue'
import Vuex from 'vuex'
import VueJsonp from 'vue-jsonp'

Vue.use(Vuex)
Vue.use(VueJsonp)

Vue.http.options.emulateJSON = true

export default new Vuex.Store({
  state: {
    instagramData:{},
    youtubeData:{},
    flickrData:{},
    tumblrData:{},
    twitterData:{},
  },
  mutations: {
    updateData(state, param) {
      switch(param.sns){
        case 'instagram':
          state.instagramData = param.data
          break
        case 'youtube':
          state.youtubeData = param.data
          break
        case 'flickr':
          state.flickrData = param.data
          break
        case 'tumblr':
          state.tumblrData = param.data
          break
        case 'twitter':
          state.twitterData = param.data
          break
      }
    },
    modifyData(state, param) {
      switch(param.sns){
        case 'instagram':
          for(let i=0; i<param.data.data.length; i++){
            state.instagramData.data.push(param.data.data[i])
          }

          state.instagramData.meta = param.data.meta
          state.instagramData.pagination = param.data.pagination
          break
        case 'youtube':
          for(let i=0; i<param.data.items.length; i++){
            state.youtubeData.items.push(param.data.items[i])
          }

          state.youtubeData.nextPageToken = param.data.nextPageToken
          break
        case 'flickr':
          for(let i=0; i<param.data.photos.photo.length; i++){
            state.flickrData.photos.photo.push(param.data.photos.photo[i])
          }

          state.flickrData.photos.page = param.data.photos.page
          state.flickrData.photos.pages = param.data.photos.pages
          state.flickrData.photos.perpage = param.data.photos.perpage
          break
      }
    },
  },
  actions: {
  	instagramLoad (context, param) {
      return new Promise(resolve => {
        let url = `https://api.instagram.com/v1/tags/${param.keyword && param.keyword.trim()}/media/recent?access_token=2945410720.02e1557.01204bc96d2c40158da88662594a684d`

        Vue.http.get(url).then(response => {
          context.commit('updateData', {sns:'instagram', data:response.data})
          resolve()
        }, response => {
          console.log(response)
        })
      })
    },
    youtubeLoad (context, param) {
      return new Promise(resolve => {
        let url = `https://content.googleapis.com/youtube/v3/search?maxResults=20&part=snippet&q=${param.keyword}&safeSearch=moderate&key=AIzaSyDJH2sAVrMq3v79apTNFO1tJjabR3tk1Mw`

        Vue.http.get(url).then(response => {
          context.commit('updateData', {sns:'youtube', data:response.data})
          resolve()
        }, response => {
          console.log(response)
        })
      })
    },
    flickrLoad (context, param) {
      return new Promise(resolve => {
        let url = `https://secure.flickr.com/services/rest/?method=flickr.photos.search&api_key=c95046e39cbbd7d6d71c452ca7a814d6&text=${param.keyword}&privacy_filter=1&safe_search=1&content_type=1&per_page=20&format=json&jsoncallback=flickrCallback&sort=date-posted-desc&extras=date_upload`

        Vue.jsonp(url, {
          callbackName: 'flickrCallback'
        }).then(data => {
          context.commit('updateData', {sns:'flickr', data:data})
          resolve()
        }).catch(response => {
          console.log(response)
        })
      })
    },
    tumblrLoad(context, param) {
      return new Promise(resolve => {
        let url = `https://api.tumblr.com/v2/tagged?api_key=Z3VFbwMIFqs1Kzo4cU8RLl5HrwoggaSlB0GoERi6Z3tYP3L1hS&tag=${param.keyword}&limit=20&before=&callback=tumblrCallback&_=1527333746403`

        Vue.jsonp(url, {
          callbackName: 'tumblrCallback'
        }).then(data => {
          context.commit('updateData', {sns:'tumblr', data:data})
          resolve()
        }).catch(response => {
          console.log(response)
        })
      })
    },
    twitterLoad(context, data) {
      context.commit('updateData', {sns:'twitter', data:data})
    },
    addedList (context, param) {
      return new Promise(resolve => {
        // instagram added
        let instagramURL = this.state.instagramData.pagination.next_url
        Vue.http.get(instagramURL).then(response => {
          context.commit('modifyData', {sns:'instagram', data:response.data})
          resolve()
        }, response => {
          console.log(response)
        })

        // youtube added
        let youtubeURL = `https://content.googleapis.com/youtube/v3/search?maxResults=20&part=snippet&q=${param.keyword}&safeSearch=moderate&key=AIzaSyDJH2sAVrMq3v79apTNFO1tJjabR3tk1Mw&nextPageToken=${this.state.instagramData.nextPageToken}`
        Vue.http.get(youtubeURL).then(response => {
          context.commit('modifyData', {sns:'youtube', data:response.data})
          resolve()
        }, response => {
          console.log(response)
        })

        //flickr added
        let flickrURL = `https://secure.flickr.com/services/rest/?method=flickr.photos.search&api_key=c95046e39cbbd7d6d71c452ca7a814d6&text=${param.keyword}&privacy_filter=1&safe_search=1&content_type=1&per_page=20&format=json&jsoncallback=flickrCallback&sort=date-posted-desc&extras=date_upload&page=${this.state.flickrData.photos.page + 1}`
        Vue.jsonp(flickrURL, {
          callbackName: 'flickrCallback'
        }).then(data => {
          context.commit('modifyData', {sns:'flickr', data:data})
          resolve()
        }).catch(response => {
          console.log(response)
        })
        
        //tumblr added
        /*let flickrURL = `https://secure.flickr.com/services/rest/?method=flickr.photos.search&api_key=c95046e39cbbd7d6d71c452ca7a814d6&text=${param.keyword}&privacy_filter=1&safe_search=1&content_type=1&per_page=20&format=json&jsoncallback=flickrCallback&sort=date-posted-desc&extras=date_upload&page=${this.state.flickrData.photos.page + 1}`
        Vue.jsonp(flickrURL, {
          callbackName: 'flickrCallback'
        }).then(data => {
          context.commit('modifyData', {sns:'flickr', data:data})
          resolve()
        }).catch(response => {
          console.log(response)
        })*/
      })
    },
  },
})