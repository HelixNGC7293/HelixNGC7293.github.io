import THREE from 'three';
window.THREE = THREE;
import Project from './objects/Project';

export default class Webgl {
  constructor( width, height, datas ) {
    this.params = {
      usePostprocessing: false,
    };

    this.datas = datas;
    this.mouse = new THREE.Vector2();

    this.camera = new THREE.PerspectiveCamera( 50, width / height, 1, 10000 );
    this.camera.position.z = 1000;

    this.scene = new THREE.Scene();

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( width, height );
    this.renderer.setClearColor( 0x000000 );

    this.composer = null;
    this.initPostprocessing();

    this.project = new Project( width, height, this.datas );
    this.project.position.set( -400, -400, 0 );
    this.scene.add( this.project );
  }

  initPostprocessing() {
    if ( !this.params.usePostprocessing ) { return; }

    /* Add the effect composer of your choice */
  }

  resize( width, height ) {
    if ( this.composer ) {
      this.composer.setSize( width, height );
    }

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize( width, height );
  }

  updateMouse( e ) {
    this.mouse.x = ( e.clientX - window.innerWidth / 2 ) / 5;
    this.mouse.y = ( e.clientY - window.innerHeight / 2 ) / 5;
  }

  updateDeviceMotion( e ) {
    this.mouse.x = e.gamma * 5;
    this.mouse.y = e.beta * 2;
    if ( this.mouse.x < -230 ) { this.mouse.x = -230; }
    if ( this.mouse.x > 230 ) { this.mouse.x = 230; }
  }

  render() {
    if ( this.params.usePostprocessing ) {
      console.warn( 'WebGL - No effect composer set.' );
    } else {
      this.renderer.render( this.scene, this.camera );
    }

    this.project.update();

    this.camera.position.x += ( this.mouse.x - this.camera.position.x / 2.0 ) * 0.06;
    this.camera.position.y += ( -this.mouse.y - this.camera.position.y / 2.0 ) * 0.06;
    this.camera.lookAt( this.scene.position );
  }
}
