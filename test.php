<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <title>test</title>
    <link rel="stylesheet" href="/static/pintuer/pintuer.css">
</head>
<body>

<div style="width: 400px; margin: 0 auto;">

    <table class="table table-bordered">

        <tr>
            <th>期数</th>
            <th>投注额</th>
            <th>收益</th>
            <th>累计</th>
        </tr>


        <?php

        $start = 1;
        $min = 3;
        $issueNum = 40;

        $odds = 9.99;

        $count = 0;


        for ($i = 0; $i < $issueNum; $i++) {

            $flag = true;
            $temp = $start;

            while ($flag) {
                if ($temp * $odds >= $count + $temp + $min) {

                    echo '<tr><td>' . ($i + 1) . '</td><td>' . $temp . '</td><td>' .
                        ($temp * $odds - $count - $temp) . '</td><td>' . ($count + $temp) . '</td></tr>';

                    $count += $temp;

                    $flag = false;
                } else {
                    $temp++;
                }
            }
        }

        ?>

    </table>
</div>
</body>
</html>

