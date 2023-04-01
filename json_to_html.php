<?php


function convertJsonToHtml($obj, $indent) {
    $html = "";
    $keys = array_keys($obj);
    $lastKeyIndex = count($keys) - 1;
    foreach ($keys as $index => $key) {
        $value = $obj[$key];
        $isLast = $index === $lastKeyIndex;
    
        if (is_array($value) || is_object($value)) {
            $html .= '<div class="row t'.$indent.' end">'."\n";
            if (!is_numeric($key)) {
                $html .= '<div class="name">"'.$key.'"</div>'."\n";
            }
            $html .= '<div class="obj">{</div></div>'."\n";
            $html .= convertJsonToHtml($value, $indent + 1);
            if ($isLast) {
                $html .= '<div class="row t'.$indent.' end">'."\n";
            } else {
                $html .= '<div class="row t'.$indent.'">'."\n";
            }
            $html .= '<div class="obj">}</div>'."\n";
            $html .= '</div>'."\n";
        } elseif (is_bool($value)) {
            if ($isLast) {
                $html .= '<div class="row t'.$indent.' end">'."\n";
            } else {
                $html .= '<div class="row t'.$indent.'">'."\n";
            }
            $html .= '<div class="name">"'.$key.'"</div>'."\n";
            $html .= '<div class="boo">'.$value.'</div>'."\n";
            $html .= '</div>'."\n";
        } else {
            if ($isLast) {
                $html .= '<div class="row t'.$indent.' end">'."\n";
            } else {
                $html .= '<div class="row t'.$indent.'">'."\n";
            }
            if (is_numeric($key)) {
                $html .= '<div class="value"></div>'."\n";
            } else {
                $html .= '<div class="name">"'.$key.'"</div>'."\n";
            }
            if (strpos($value, "http") === 0) {
                $html .= '<div class="value">"<a href="'.$value.'" target="_blank">'.$value.'</a>"</div>'."\n";
            } else {
                if (strpos($value, "@") !== false) {
                    $html .= '<div class="value">"<a href="mailto:'.$value.'" target="_blank">'.$value.'</a>"</div>'."\n";
                } else {
                    $html .= '<div class="value">"'.$value.'"</div>'."\n";
                }
            }
            $html .= '</div>'."\n";
        }
    
        if (!$isLast) {
            $html .= '</div>'."\n";
        }
    }
    return $html;
}

?>