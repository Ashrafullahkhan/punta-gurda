import type { EChartsCoreOption } from 'echarts/core';
import { CategorySlice, CollectionPoint } from '../../shared/models/dashboard.model';

const COLORS = {
  current: '#16A34A',
  previous: '#2563EB',
  text: '#64748B',
  axis: '#94A3B8',
  split: '#E2E8F0',
};

export function buildCollectionChartOption(
  points: CollectionPoint[],
  labels: { current: string; previous: string },
): EChartsCoreOption {
  return {
    color: [COLORS.current, COLORS.previous],
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#fff',
      borderColor: COLORS.split,
      borderWidth: 1,
      textStyle: { color: '#0F172A', fontSize: 12 },
      axisPointer: {
        type: 'line',
        lineStyle: { color: '#CBD5E1', type: 'dashed' },
      },
    },
    legend: {
      top: 0,
      left: 'center',
      icon: 'circle',
      itemWidth: 8,
      itemHeight: 8,
      itemGap: 18,
      textStyle: {
        color: COLORS.text,
        fontSize: 12,
        fontWeight: 600,
      },
      data: [labels.current, labels.previous],
    },
    grid: {
      left: 8,
      right: 12,
      top: 42,
      bottom: 8,
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: points.map((p) => p.label),
      axisTick: { show: false },
      axisLine: { lineStyle: { color: COLORS.split } },
      axisLabel: {
        color: COLORS.axis,
        fontSize: 11,
        fontWeight: 600,
        margin: 12,
      },
    },
    yAxis: {
      type: 'value',
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        color: COLORS.axis,
        fontSize: 11,
        fontWeight: 600,
      },
      splitLine: {
        lineStyle: {
          color: COLORS.split,
          type: 'dashed',
        },
      },
    },
    series: [
      {
        name: labels.current,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        showSymbol: true,
        lineStyle: { width: 3, color: COLORS.current },
        itemStyle: {
          color: COLORS.current,
          borderColor: '#fff',
          borderWidth: 2,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(22, 163, 74, 0.22)' },
              { offset: 1, color: 'rgba(22, 163, 74, 0.02)' },
            ],
          },
        },
        data: points.map((p) => p.current),
      },
      {
        name: labels.previous,
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 7,
        showSymbol: true,
        lineStyle: { width: 3, color: COLORS.previous },
        itemStyle: {
          color: COLORS.previous,
          borderColor: '#fff',
          borderWidth: 2,
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
              { offset: 0, color: 'rgba(37, 99, 235, 0.18)' },
              { offset: 1, color: 'rgba(37, 99, 235, 0.02)' },
            ],
          },
        },
        data: points.map((p) => p.previous),
      },
    ],
  };
}

export function buildSourceChartOption(
  categories: CategorySlice[],
  names: string[],
  totalLabel: string,
  totalValue: string,
): EChartsCoreOption {
  return {
    tooltip: {
      trigger: 'item',
      backgroundColor: '#fff',
      borderColor: COLORS.split,
      borderWidth: 1,
      textStyle: { color: '#0F172A', fontSize: 12 },
      formatter: '{b}<br/>{d}%',
    },
    legend: { show: false },
    series: [
      {
        type: 'pie',
        radius: ['62%', '84%'],
        center: ['50%', '50%'],
        avoidLabelOverlap: true,
        padAngle: 2.5,
        itemStyle: {
          borderRadius: 5,
          borderColor: '#fff',
          borderWidth: 3,
        },
        label: {
          show: true,
          position: 'center',
          formatter: `{total|${totalValue}}\n{sub|${totalLabel}}`,
          rich: {
            total: {
              fontSize: 16,
              fontWeight: 800,
              color: '#0F172A',
              lineHeight: 22,
            },
            sub: {
              fontSize: 12,
              fontWeight: 600,
              color: '#94A3B8',
              lineHeight: 18,
            },
          },
        },
        labelLine: { show: false },
        data: categories.map((slice, i) => ({
          name: names[i],
          value: slice.value,
          itemStyle: { color: slice.color },
        })),
      },
    ],
  };
}
