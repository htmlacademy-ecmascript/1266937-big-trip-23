import TripInfoView from '../view/trip-info-view';
import FilterView from '../view/filter-view.js';
import SortingView from '../view/sorting-view.js';
import PointListView from '../view/point-list-view.js';
import PointFormView from '../view/point-form-view.js';
import PointView from '../view/point-view.js';
import {render, RenderPosition} from '../render.js';

export default class Presenter {
  pointListComponent = new PointListView();

  constructor({tripInfoContainer, filterContainer, sortingContainer, pointListContainer, pointsModel}) {
    this.tripInfoContainer = tripInfoContainer;
    this.filterContainer = filterContainer;
    this.sortingContainer = sortingContainer;
    this.pointListContainer = pointListContainer;

    this.pointsModel = pointsModel;
  }

  init() {
    this.points = [...this.pointsModel.getPoints()];

    render(new TripInfoView(), this.tripInfoContainer, RenderPosition.AFTERBEGIN);
    render(new FilterView(), this.filterContainer);
    render(new SortingView(), this.sortingContainer);

    render(this.pointListComponent, this.pointListContainer);

    render(new PointFormView(), this.pointListComponent.getElement());

    for (let i = 0; i < this.points.length; i++) {
      render(new PointView({point: this.points[i]}), this.pointListComponent.getElement());
    }
  }
}
