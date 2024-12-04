<template>
  <div id="sell-show">
    <div class="sell-input">
      <div>设备SN：</div>
      <el-input
        v-model="input"
        style="width: 280px"
        placeholder="输入设备SN查看可购买套餐及展示效果"
      />
    </div>
    <el-divider />
    <div class="sell-context">
      <el-row>
        <el-col :span="24">
          <div class="sell-title">畅销套餐</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <el-row>
            <el-col :span="24">
              <div class="grid-content ep-bg-purple-dark">
                1500G/月大流量套餐-联通电信双网
                <br />
                按月计费 - 1500G/月
              </div>
            </el-col>
          </el-row>
          <el-row class="plain-color">
            <el-col :span="6">
              <el-card>
                <div class="grid-content ep-bg-purple cursor-point">
                  <div>1个月</div>
                  <div>¥79/月</div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card>
                <div class="grid-content ep-bg-purple cursor-point">
                  <div>3个月</div>
                  <div>¥66.33/月</div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card>
                <el-badge badge-class="badge-tj" value="推荐" class="item" />
                <div class="grid-content ep-bg-purple cursor-point is-select">
                  <div>6个月</div>
                  <div>¥49.83/月</div>
                </div>
              </el-card>
            </el-col>
            <el-col :span="6">
              <el-card>
                <el-badge badge-class="badge-tj" value="推荐" class="item" />
                <div class="grid-content ep-bg-purple cursor-point is-select">
                  <div>12个月</div>
                  <div>¥38.25/月</div>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="sell-title2">精选套餐</div>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="12">
          <el-card class="cursor-point left">
            <el-badge badge-class="badge-tj" value="推荐" class="item" />
            <el-row>
              <el-col :span="24">
                <div class="grid-content ep-bg-purple-dark">
                  10G/3天体验套餐-联通电信双网<br />累积计费-10G/3天
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="grid-content ep-bg-purple">¥5.9</div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="cursor-point right">
            <el-badge badge-class="badge-tj" value="推荐" class="item" />
            <el-row>
              <el-col :span="24">
                <div class="grid-content ep-bg-purple-dark">
                  30G/15天体验套餐-联通电信双网<br />累积计费-30G/15天
                </div>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="24">
                <div class="grid-content ep-bg-purple">¥9.9</div>
              </el-col>
            </el-row>
          </el-card>
        </el-col>
      </el-row>
    </div>
    <div class="sell-submit" />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped>
#sell-show {
  max-height: 600px;
  height: 600px;
  border: 1px solid #dcdfe6;
}
.el-row {
  margin-bottom: 0px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 0px;
}
.grid-content {
  border-radius: 0px;
  text-align: center;
  border: 0px;
  font-size: 10px;
  padding: 8px 4px;
  line-height: 16px;
}
.grid-content div {
  border-radius: 0px;
  cursor: pointer;
}
.ep-bg-purple-dark {
  background: #7a80b4;
  color: white;
}
.ep-bg-purple {
  background: #f5f7fa;
}
.el-card {
  margin: 10px 5px 10px 5px;
  --el-card-padding: 0 !important;
  border-radius: 0;
}
.is-select {
  border: 1px solid #9fceff;
  background: #ebf5ff;
  color: #409eff;
}
.el-badge {
  position: absolute;
  cursor: pointer;
  --el-badge-font-size: 8px;
  --el-badge-size: 16px;
  --el-badge-padding: 4px;
}
.cursor-point {
  cursor: pointer;
}
.item {
  margin-top: -7px;
  margin-left: -5px;
  z-index: 1000;
}
.sell-context {
  padding: 0 10px;
}
.plain-color {
  background: #bec4ff54;
}
.sell-input {
  padding: 10px 0 0 10px;
  display: flex;
  line-height: 32px;
}
.sell-title {
  padding: 10px 0;
}
.sell-title2 {
  padding: 10px 0 5px 0;
}
.left {
  margin: 5px 5px 0 0 !important;
}
.right {
  margin: 5px 0 0 5px !important;
}
.el-divider--horizontal {
  margin: 10px 0 0 0;
}
</style>
