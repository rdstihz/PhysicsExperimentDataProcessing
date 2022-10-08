export class ExperimentMenu {
    constructor(id) {
        this.$menu = $('#' + id);

        this.$item_electrostatic_field = this.$menu.find("#experiment-menu-item-electrostatic-field");
        this.$item_viscosity_coefficient = this.$menu.find("#experiment-menu-item-viscosity-coefficient");
        this.$item_air_cushion = this.$menu.find("#experiment-menu-item-air-cushion");
        this.$item_newton_rings = this.$menu.find("#experiment-menu-item-newton-rings");
        this.$item_simple_pendlum = this.$menu.find("#experiment-menu-item-simple-pendlum");
        this.$item_rotational_inertia = this.$menu.find("#experiment-menu-item-rotational-inertia");

        this.$item_toolbox = this.$menu.find(".experiment-menu-toolbox");

        this.start();
    }

    start() {
        let outer = this;
        this.$item_electrostatic_field.click(function (e) {
            window.location.replace("/exp/electrostatic/");
        });

        this.$item_viscosity_coefficient.click(function (e) {
            outer.hide();
            outer.root.viscosity_coefficient.show();
        });

        this.$item_air_cushion.click(function (e) {
            window.location.replace("/exp/air_cushion/");
        });

        this.$item_newton_rings.click(function (e) {
            window.location.replace("/exp/newton_rings/");
        });
        //
        this.$item_simple_pendlum.click(function (e) {
            window.location.replace("/exp/simple_pendlum/");
        });

        this.$item_rotational_inertia.click(function (e) {
            window.location.replace("/exp/rotational_inertia/");
        });
        //
        // this.$item_toolbox.click(function (e) {
        //     outer.hide();
        //     outer.root.toolbox.show();
        // });
    }

    show() {
        this.$menu.show();
    }

    hide() {
        this.$menu.hide();
    }

}