<template>
  <div id="image-slider">
    <div
      class="image-verify-box"
      :style="{ width: (canvasSize.width || width) + 80 + 'px' }"
    >
      <div style="margin-bottom: 20px;">
        <slot name="title">请完成安全验证</slot>
      </div>
      <div
        :style="{
          width: canvasSize.width || width + 'px',
          margin: 'auto',
          position: 'relative'
        }"
      >
        <span
          class="el-icon-refresh"
          @click="initVerifyImage"
          :style="{ color: ctx ? '#fff' : '#333' }"
        ></span>
        <canvas
          id="imageVerify"
          :width="canvasSize.width || width"
          :height="canvasSize.height || height"
        ></canvas>
        <div
          class="slider-box"
          :style="sliderStyle"
          @mouseleave.stop.prevent="sliderMouseleave"
          @mousemove.stop.prevent="sliderMousemove"
        >
          <div
            class="slide-handler"
            :style="sliderTransform"
            @mousedown.stop.prevent="sliderMousedown"
            @mousemove.stop.prevent="sliderMousemove"
            @mouseleave.stop.prevent="sliderMouseleave"
            @mouseup.stop.prevent="sliderMouseup"
          >
            <slot name="slide">
              <span class="slider el-icon-right"> </span>
            </slot>
          </div>
          <span class="cus-text" style="color: #999"
            >请拖动左方滑块进行验证</span
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ImageVerify',
  components: {},
  props: {
    reset: Boolean,
    // slider 区域离 图片距离
    sliderTop: {
      type: Number,
      default: 8
    },
    // canvas 宽度
    width: {
      type: Number,
      default: 315
    },
    // canvas 高度
    height: {
      type: Number,
      default: 168
    },
    // 自动裁剪 slider 的大小
    cutSize: {
      type: Number,
      default: 40
    },
    // 误差
    mistake: {
      type: Number,
      default: 3
    },
    // cutImage 默认左边距
    offsetLeft: {
      type: Number,
      default: 10
    },

    bgImg: [String, Array],
    cutImg: String,
    cutPosition: {
      type: Object,
      default() {
        return {
          x: 0,
          y: 0
        }
      }
    },
    verifyType: String,
    visibleVerify: Boolean,

    // 本地图片集合 type = iamge 必须
    localImage: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      // 滑块初始定位
      sliderInitPosition: {
        x: 15,
        y: 0
      },
      // slider 滑块定位
      sliderPoint: {
        pageX: 0,
        pageY: 0,
        moveX: 0,
        moveY: 0,
        maxPageX: 0
      },
      // canvas（背景图片） 大小
      canvasSize: {
        width: 0,
        height: 0
      },
      // 滑块图片 大小
      cutImageSize: {
        width: 0,
        height: 0
      },
      // slider 大小
      sliderSize: {
        width: 0,
        height: 0
      },
      // 当前图片路径
      currentImageSrc: {
        bgImage: '',
        cutImage: ''
      },
      imageSrc: [],

      sliderDown: false,
      ctx: null,
      initImage: null,
      bgImage: null,
      cutImage: null,
      srcImage: null,

      rate: 0,
      cutOffset: 20, // 裁剪区域边距
      PI: Math.PI,
      R: 8
    }
  },
  computed: {
    sliderStyle() {
      return {
        marginTop: this.sliderTop + 'px',
        width: (this.canvasSize.width || this.width) + 'px'
      }
    },
    sliderTransform() {
      return {
        transform: `translateX(${this.sliderPoint.moveX}px)`
      }
    },
    slideType() {
      if (this.localImage.length > 0) {
        // local
        return 'local'
      } else if (this.bgImg && this.cutImg) {
        // api
        return 'api'
      } else {
        return 'auto'
      }
    }
  },
  created() {
    // this.getVerifyImg();
  },
  mounted() {
    this.$nextTick(() => {
      const body = document.querySelector('body')
      this.initVerifyImage()
      if (body.append) {
        body.append(this.$el)
      } else {
        body.appendChild(this.$el)
      }
    })
  },
  methods: {
    async initVerifyImage() {
      switch (this.slideType) {
        case 'api':
          this.currentImageSrc.bgImage = this.bgImg
          this.currentImageSrc.cutImage = this.cutImg
          this.sliderInitPosition.x = this.cutPosition.x
          this.sliderInitPosition.y = this.cutPosition.y
          break
        // case "local":
        //     console.log(this.localImage);
        //     break;
        default:
          await this.createAutoVerifyImg()
          break
      }
      this.$nextTick(() => this.readImage())
    },
    /**
     * @desc 自动生成默认图片
     */
    async createAutoVerifyImg() {
      ;(this.canvasSize = {
        width: this.width,
        height: this.height
      }),
        (this.cutImageSize = {
          width: this.cutSize,
          height: this.cutSize
        })

      let maxCutX =
        this.canvasSize.width -
        this.cutImageSize.width -
        this.R -
        this.cutOffset * 2
      let maxCutY =
        this.canvasSize.height -
        this.cutImageSize.height -
        this.R -
        this.cutOffset * 2
      let imageRGB = [
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255),
        Math.floor(Math.random() * 255)
      ]
      let cutPosition = [
        this.cutPosition.x ||
          this.cutOffset + Math.floor(Math.random() * maxCutX),
        this.cutPosition.y ||
          this.cutOffset + Math.floor(Math.random() * maxCutY)
      ]
      this.sliderInitPosition.x = cutPosition[0]
      this.sliderInitPosition.y = cutPosition[1] - 2 * this.R + 2
      if (this.slideType === 'local') {
        imageRGB = this.initLocalIamge()
      }
      this.currentImageSrc.cutImage = await this.createSlider(
        imageRGB,
        cutPosition
      )
      this.currentImageSrc.bgImage = await this.createSliderBg(
        imageRGB,
        cutPosition
      )
    },
    /**
     * @desc 处理本地图片
     */
    initLocalIamge() {
      let image = this.localImage
      let len = image.length
      return image[Math.floor(Math.random() * len)]
    },
    fillCanvasByLoacal(ctx, src) {
      return new Promise(resolve => {
        let img = new Image()
        img.src = src
        img.onload = function() {
          ctx.drawImage(this, 0, 0, this.width, this.height)
          resolve(ctx)
        }
      })
    },
    fillCanvasByAuto(ctx, imageRGB, opacity) {
      ctx.fillStyle = opacity
        ? `rgba(${imageRGB[0]}, ${imageRGB[1]}, ${imageRGB[2]}, ${opacity})`
        : `rgb(${imageRGB[0]}, ${imageRGB[1]}, ${imageRGB[2]})`
      ctx.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height)
    },
    /**
     * @desc 图片裁剪
     * @params {Object} ctx canvas content 对象
     * @params {String} type 操作类型（clip:裁剪；fill:填充）
     * @params {Object} cutPosition 操作坐标
     */
    autoCutImage(ctx, type, cutPosition) {
      const [w, h, r, x, y, PI] = [
        this.cutImageSize.width,
        this.cutImageSize.height,
        this.R,
        cutPosition[0],
        cutPosition[1],
        this.PI
      ]
      ctx.beginPath()
      ctx.strokeStyle = '#fff'
      ctx.moveTo(x, y)
      ctx.lineTo(x + w / 2, y)
      ctx.arc(x + w / 2, y - r + 2, r, (1 / 2) * PI, (5 / 2) * PI)
      ctx.moveTo(x + w / 2, y)
      ctx.lineTo(x + w, y)
      ctx.lineTo(x + w, y + h / 2)
      ctx.arc(x + w + r - 2, y + h / 2, r, PI, 3 * PI)
      ctx.moveTo(x + w, y)
      ctx.lineTo(x + w, y + h)
      ctx.lineTo(x, y + h)
      ctx.lineTo(x, y + h / 2 + r)
      ctx.arc(x, y + h / 2, r, (1 / 2) * PI, (3 / 2) * PI, true)
      ctx.lineTo(x, y)

      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
      if (type === 'clip') {
        ctx.clip()
        return { w, h, r, x, y }
      } else {
        ctx.fillStyle = '#fff'
        ctx.fill()
      }
    },
    /**
     * @desc 生成滑块图
     */
    async createSlider(imageRGB, cutPosition) {
      let canvas = document.createElement('canvas')
      canvas.width = this.canvasSize.width
      canvas.height = this.canvasSize.height
      let ctx = canvas.getContext('2d')
      ctx.fillStyle = 'transparent'
      ctx.fillRect(0, 0, this.canvasSize.width, this.canvasSize.height)
      ctx.save()
      let { w, h, r, x, y } = this.autoCutImage(ctx, 'clip', cutPosition)
      let cutImage = null
      if (this.slideType === 'local') {
        await this.fillCanvasByLoacal(ctx, imageRGB)
      } else {
        this.fillCanvasByAuto(ctx, imageRGB)
      }
      cutImage = ctx.getImageData(
        x,
        y - 2 * r + 2,
        w + 2 * r - 2,
        h + 2 * r - 2
      )
      ctx.restore()
      canvas.width = w + 2 * r - 2
      canvas.height = h + 2 * r - 2
      ctx.putImageData(cutImage, 0, 0)
      let path = canvas.toDataURL()
      ctx = canvas = cutImage = null
      return path
    },
    /**
     * @desc 生成背景图
     */
    async createSliderBg(imageRGB, cutPosition) {
      let canvas = document.createElement('canvas')
      canvas.width = this.canvasSize.width
      canvas.height = this.canvasSize.height
      let ctx = canvas.getContext('2d')

      if (this.slideType === 'local') {
        await this.fillCanvasByLoacal(ctx, imageRGB)
      } else {
        this.fillCanvasByAuto(ctx, imageRGB, 0.8)
      }
      this.autoCutImage(ctx, 'fill', cutPosition)
      let path = canvas.toDataURL()
      ctx = canvas = null
      return path
    },

    readImage() {
      let $this = this
      let bgImage = new Image()
      let cutImage = new Image()
      let canvas = document.querySelector('#imageVerify')
      this.ctx = canvas.getContext('2d')
      this.canvasSize.width &&
        this.canvasSize.height &&
        this.ctx.clearRect(0, 0, this.canvasSize.width, this.canvasSize.height)
      let slider = document.querySelector('#image-slider .slide-handler')
      this.sliderSize = {
        width: 38 || slider.clientWidth,
        height: 38 || slider.clientHeight
      }

      bgImage.src = this.currentImageSrc.bgImage
      cutImage.src = this.currentImageSrc.cutImage
      this.srcImage = bgimg
      this.cutImage = cutImage

      let readBg = new Promise(resolve => {
        bgimg.onload = function() {
          $this.ctx.globalCompositeOperation = 'destination-over'
          $this.ctx.drawImage(this, 0, 0)
          bgimg = null
          resolve()
        }
      })

      let readCut = new Promise(resolve => {
        cutImage.onload = function() {
          $this.cutImageSize = {
            width: this.width,
            height: this.height
          }
          $this.rate =
            ($this.imageOption.srcImageWidth - this.width - $this.offsetLeft) /
            ($this.imageOption.srcImageWidth - $this.sliderSize.width)
          $this.ctx.globalCompositeOperation = 'source-over'
          $this.ctx.drawImage(
            this,
            $this.offsetLeft,
            $this.sliderInitPosition.y
          )
          cutImage = null
          resolve()
        }
      })
      Promise.all([readCut, readBg]).then(() => {
        this.initImage = this.ctx.getImageData(
          0,
          0,
          this.imageOption.srcImageWidth,
          this.imageOption.srcImageLength
        )
        this.loading.close()
      })
    },

    sliderMousedown(e) {
      if (!this.ctx) return
      this.sliderDown = true
      this.sliderPoint.pageX = e.pageX
      this.sliderPoint.pageY = e.pageY
      this.sliderPoint.maxPageX =
        e.pageX + this.canvasSize.width - this.sliderSize.width
      this.sliderMousemove = this.sliderMove
    },
    sliderMousemove() {
      return
    },
    sliderMouseleave() {
      this.sliderReset()
    },
    sliderMouseup(e) {
      let endX = Math.round(
        this.offsetLeft + (e.pageX - this.sliderPoint.pageX) * this.rate
      )
      let endY = Math.round(
        this.sliderInitPosition.y - (e.pageY - this.sliderPoint.pageY)
      )
      if (this.verifyType === 'api') {
        this.$emit('success', [endX, endY])
        return
      }
      if (Math.abs(this.sliderInitPosition.x - endX) <= this.mistake) {
        this.$emit('success', [endX, endY])
      } else {
        this.$emit('error', [endX, endY])
        this.sliderReset()
      }
    },
    sliderMove(e) {
      if (
        this.sliderPoint.pageX >= e.pageX ||
        this.sliderPoint.maxPageX <= e.pageX
      )
        return false
      this.sliderPoint.moveX = e.pageX - this.sliderPoint.pageX
      this.sliderPoint.moveY = e.pageY - this.sliderPoint.pageY
      this.ctx.putImageData(this.bgImage, 0, 0)
      this.ctx.drawImage(
        this.cutImage,
        this.offsetLeft + this.sliderPoint.moveX * this.rate,
        this.sliderInitPosition.y
      )
    },
    sliderLeave() {
      this.sliderReset()
    },
    sliderReset() {
      if (!this.ctx) return
      this.sliderDown = false
      this.sliderMousemove = () => {
        return
      }
      this.sliderPoint = {
        pageX: 0,
        pageY: 0,
        moveX: 0,
        moveY: 0
      }
      this.$emit('rest')
      this.ctx.putImageData(this.initImage, 0, 0)
    }
  },
  watch: {
    reset() {
      this.initVerifyImage()
    }
  }
}
</script>

<style scoped lang="scss">
.image-verify-box {
  margin: auto;
  background: #fff;
  transform: translateY(80%);
  padding: 18px;
  border-radius: 5px;
  .el-icon-refresh {
    position: absolute;
    width: 28px;
    height: 28px;
    border-radius: 50%;
    top: 8px;
    right: 0px;
    font-size: 18px;
    font-weight: bold;
    cursor: pointer;
    z-index: 9;
  }
}
#image-slider {
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99;
}
#imageVerify {
  border-radius: 5px;
  border: 1px solid #ddd;
  box-sizing: border-box;
}
.slider-box {
  position: relative;
  height: 38px;
  line-height: 38px;
  color: #333;
  font-size: 12px;
  border: 1px solid #ddd;
  border-radius: 20px;
  text-align: center;
  cursor: default;
  margin: auto;
  .slide-handler {
    position: absolute;
    width: 38px;
    height: 38px;
    border-radius: 50%;
    overflow: hidden;
    .slider {
      border-radius: 50%;
      display: block;
      border: 2px solid #99171480;
      font-size: 28px;
      color: #99171480;
      font-weight: bold;
      text-align: center;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;
      top: 0px;
      left: 0;
      background: #fff;
      transform: translateX(0);
    }
    &:hover .slider {
      border-color: #991714;
      color: #991714;
      box-shadow: 0 0 5px;
    }
  }
}
</style>
