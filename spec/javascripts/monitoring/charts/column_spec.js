import { shallowMount, createLocalVue } from '@vue/test-utils';
import { GlColumnChart } from '@gitlab/ui/dist/charts';
import ColumnChart from '~/monitoring/components/charts/column.vue';

const localVue = createLocalVue();

describe('Column component', () => {
  let columnChart;

  beforeEach(() => {
    columnChart = shallowMount(localVue.extend(ColumnChart), {
      propsData: {
        graphData: {
          metrics: [
            {
              x_label: 'Time',
              y_label: 'Usage',
              result: [
                {
                  metric: {},
                  values: [
                    [1495700554.925, '8.0390625'],
                    [1495700614.925, '8.0390625'],
                    [1495700674.925, '8.0390625'],
                  ],
                },
              ],
            },
          ],
        },
        containerWidth: 100,
      },
      sync: false,
      localVue,
    });
  });

  afterEach(() => {
    columnChart.destroy();
  });

  describe('wrapped components', () => {
    describe('GitLab UI column chart', () => {
      let glColumnChart;

      beforeEach(() => {
        glColumnChart = columnChart.find(GlColumnChart);
      });

      it('is a Vue instance', () => {
        expect(glColumnChart.isVueInstance()).toBe(true);
      });

      it('receives data properties needed for proper chart render', () => {
        const props = glColumnChart.props();

        expect(props.data).toBe(columnChart.vm.chartData);
        expect(props.option).toBe(columnChart.vm.chartOptions);
      });
    });
  });
});
