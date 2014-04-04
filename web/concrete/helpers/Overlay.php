<?
namespace Concrete\Helper;
class Overlay {

	public function init($selector = '.ccm-overlay') {
		$view = View::getInstance();
		$v = View::getInstance();
		$v->requireAsset('core/overlay');
		if($selector && strlen($selector)) {
			$js = "<script type=\"text/javascript\">$(function() {
				$('".$selector."-image').magnificPopup({type:'image'});
				$('".$selector."-iframe').magnificPopup({type:'image'});
				$('".$selector."-inline').magnificPopup({type:'image'});
				$('".$selector."-ajax').magnificPopup({type:'image'});
			});</script>";
			$view->addFooterItem($js);
		}
	}
}