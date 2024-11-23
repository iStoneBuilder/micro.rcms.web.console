// 抽离可公用的工具函数等用于系统管理页面逻辑
import { computed } from "vue";
import { useDark } from "@pureadmin/utils";
// import { da } from "@faker-js/faker";

export function usePublicHooks() {
  const { isDark } = useDark();

  const switchStyle = computed(() => {
    return {
      "--el-switch-on-color": "#6abe39",
      "--el-switch-off-color": "#e84749"
    };
  });

  const tagStyle = computed(() => {
    return (status: number) => {
      return status === 1
        ? {
            "--el-tag-text-color": isDark.value ? "#6abe39" : "#389e0d",
            "--el-tag-bg-color": isDark.value ? "#172412" : "#f6ffed",
            "--el-tag-border-color": isDark.value ? "#274a17" : "#b7eb8f"
          }
        : {
            "--el-tag-text-color": isDark.value ? "#e84749" : "#cf1322",
            "--el-tag-bg-color": isDark.value ? "#2b1316" : "#fff1f0",
            "--el-tag-border-color": isDark.value ? "#58191c" : "#ffa39e"
          };
    };
  });

  const tagEnterprise = computed(() => {
    const data = {
      platform: {
        "--el-tag-text-color": isDark.value ? "#6abe39" : "#389e0d",
        "--el-tag-bg-color": isDark.value ? "#172412" : "#f6ffed",
        "--el-tag-border-color": isDark.value ? "#274a17" : "#b7eb8f"
      },
      enterprise: {
        "--el-tag-text-color": isDark.value ? "#e84749" : "#cf1322",
        "--el-tag-bg-color": isDark.value ? "#2b1316" : "#fff1f0",
        "--el-tag-border-color": isDark.value ? "#58191c" : "#ffa39e"
      },
      merchant: {
        "--el-tag-text-color": isDark.value ? "#ff9900" : "#f49507",
        "--el-tag-bg-color": isDark.value ? "#b2956996" : "#fff5e6",
        "--el-tag-border-color": isDark.value ? "#efa9458a" : "#ffcb80"
      }
    };
    return (key: string) => {
      const index: string = key;
      return data[index];
    };
  });

  const tagName = computed(() => {
    const data = {
      platform: "平台",
      enterprise: "企业",
      merchant: "商户"
    };
    return (key: string) => {
      const index: string = key;
      return data[index];
    };
  });

  return {
    /** 当前网页是否为`dark`模式 */
    isDark,
    /** 表现更鲜明的`el-switch`组件  */
    switchStyle,
    /** 表现更鲜明的`el-tag`组件  */
    tagStyle,
    tagEnterprise,
    tagName
  };
}
